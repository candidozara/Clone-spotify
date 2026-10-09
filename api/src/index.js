const headers = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { headers });
    if (request.method !== 'GET' || url.pathname !== '/api/catalog') {
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });
    }

    try {
      const [modules, content] = await Promise.all([
        env.DB.prepare(`SELECT id, module_number, pillar, title, short_description, long_description,
          application_question, tags_json, availability, sort_order
          FROM learning_modules WHERE availability != 'archived' ORDER BY sort_order`).all(),
        env.DB.prepare(`SELECT id, module_id, title, short_description, content_type, audio_path,
          duration_seconds, availability, published_at, sort_order
          FROM learning_content WHERE availability = 'published' ORDER BY module_id, sort_order`).all()
      ]);
      return Response.json({ modules: modules.results, content: content.results }, { headers });
    } catch (error) {
      return Response.json({
        error: 'Catalog unavailable',
        message: 'O catálogo editorial está sendo preparado. Tente novamente em instantes.'
      }, { status: 503, headers });
    }
  }
};
