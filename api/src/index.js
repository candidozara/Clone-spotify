const headers = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET'
};
const AUDIO_ORIGIN = 'https://soundwave-1au.pages.dev/audio/';

function audioHeaders(type, length, start, end, partial) {
  const result = new Headers({
    'content-type': type || 'application/octet-stream',
    'access-control-allow-origin': '*',
    'accept-ranges': 'bytes',
    'cache-control': 'public, max-age=3600'
  });
  result.set('content-length', String(partial ? end - start + 1 : length));
  if (partial) result.set('content-range', `bytes ${start}-${end}/${length}`);
  return result;
}

function byteRange(value, size) {
  if (!value?.startsWith('bytes=')) return null;
  const [startText, endText] = value.slice(6).split(',', 1)[0].trim().split('-', 2);
  if (startText === '' && endText === '') return 'invalid';
  if (startText === '') {
    const suffix = Number(endText);
    if (!Number.isInteger(suffix) || suffix <= 0) return 'invalid';
    return [Math.max(0, size - suffix), size - 1];
  }
  const start = Number(startText);
  const end = endText === '' ? size - 1 : Number(endText);
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || start >= size) return 'invalid';
  return [start, Math.min(end, size - 1)];
}

async function serveAudio(request, filename) {
  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(filename)) {
    return new Response('Not found', { status: 404, headers: { 'access-control-allow-origin': '*' } });
  }
  const upstream = await fetch(`${AUDIO_ORIGIN}${encodeURIComponent(filename)}`);
  if (!upstream.ok) return new Response('Audio unavailable', { status: upstream.status, headers: { 'access-control-allow-origin': '*' } });
  const body = await upstream.arrayBuffer();
  const range = byteRange(request.headers.get('range'), body.byteLength);
  const type = upstream.headers.get('content-type');
  if (range === 'invalid') return new Response(null, { status: 416, headers: { 'content-range': `bytes */${body.byteLength}`, 'access-control-allow-origin': '*' } });
  if (!range) return new Response(body, { headers: audioHeaders(type, body.byteLength, 0, body.byteLength - 1, false) });
  const [start, end] = range;
  return new Response(body.slice(start, end + 1), { status: 206, headers: audioHeaders(type, body.byteLength, start, end, true) });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { headers });
    if (request.method !== 'GET') return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });
    if (url.pathname.startsWith('/api/audio/')) {
      return serveAudio(request, decodeURIComponent(url.pathname.slice('/api/audio/'.length)));
    }
    if (url.pathname !== '/api/catalog') return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });

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
