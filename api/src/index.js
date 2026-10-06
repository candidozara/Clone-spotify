export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  const headers = { 'content-type':'application/json','access-control-allow-origin':'*' };
  if (request.method === 'OPTIONS') return new Response(null,{headers:{...headers,'access-control-allow-methods':'GET'}});
  if (url.pathname !== '/api/catalog' || request.method !== 'GET') return new Response(JSON.stringify({error:'Not found'}),{status:404,headers});
  const [artists, tracks] = await Promise.all([
   env.DB.prepare('SELECT id,name,genre,color FROM artists ORDER BY name').all(),
   env.DB.prepare('SELECT tracks.id,title,artist_id,artists.name AS artist,duration,accent FROM tracks JOIN artists ON artists.id=tracks.artist_id ORDER BY tracks.id').all()
  ]);
  return Response.json({artists:artists.results,tracks:tracks.results},{headers});
 }
};
