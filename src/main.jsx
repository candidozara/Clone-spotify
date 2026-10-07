import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8787';
const audioPathByTrackId = {
  1: '/audio/alec_koff-carnaval-484622.mp3', 2: '/audio/audiocopper-dark-571483.mp3',
  3: '/audio/grand_project-wonders-of-the-earth-550792.mp3', 4: '/audio/kontraa-water-afro-pop-music-445661.mp3',
  5: '/audio/lnplusmusic-sport-sports-rock-music-597971.mp3', 6: '/audio/lnplusmusic-suspense-tension-horror-trailer-323181.mp3',
  7: '/audio/mickeyscat-moment-of-peace-mickeyscat-554494.mp3', 8: '/audio/musicdream-dramatic-cinematic-documentary-609202.mp3',
  9: '/audio/sigmamusicart-football-football-music-551346.mp3', 10: '/audio/sigmamusicart-no-copyright-music-537751.mp3'
};
const vibes = { 1:'Festa', 2:'Noturna', 3:'Cinemática', 4:'Festa', 5:'Energia', 6:'Cinemática', 7:'Calma', 8:'Cinemática', 9:'Energia', 10:'Noturna' };
const artistImageById = { 1:'/images/artists/alec-koff.webp', 2:'/images/artists/audiocopper.webp', 3:'/images/artists/grand-project.webp', 4:'/images/artists/kontraa.webp', 5:'/images/artists/lnplusmusic.webp', 6:'/images/artists/mickeyscat.webp', 7:'/images/artists/musicdream.webp', 8:'/images/artists/sigmamusicart.webp' };
const coverPathByTrackId = { 1:'/images/covers/carnaval.webp', 2:'/images/covers/dark.webp', 3:'/images/covers/wonders-of-the-earth.webp', 4:'/images/covers/water-afro-pop-music.webp', 5:'/images/covers/sport-sports-rock-music.webp', 6:'/images/covers/suspense-tension-horror-trailer.webp', 7:'/images/covers/moment-of-peace.webp', 8:'/images/covers/dramatic-cinematic-documentary.webp', 9:'/images/covers/football-football-music.webp', 10:'/images/covers/no-copyright-music.webp' };
const withAudioPaths = catalog => ({ ...catalog, artists: catalog.artists.map(artist => ({ ...artist, image_path: artist.image_path || artistImageById[artist.id] })), tracks: catalog.tracks.map(track => ({ ...track, audio_path: track.audio_path || audioPathByTrackId[track.id], cover_path: track.cover_path || coverPathByTrackId[track.id], vibe: vibes[track.id] || 'Descobrir' })) });
const demo = { artists:[{id:1,name:'Alec Koff',genre:'Pixabay Music',color:'#8b5cf6'},{id:2,name:'Audiocopper',genre:'Pixabay Music',color:'#64748b'},{id:3,name:'Grand Project',genre:'Pixabay Music',color:'#0ea5e9'},{id:4,name:'Kontraa',genre:'Pixabay Music',color:'#14b8a6'},{id:5,name:'LNPlusMusic',genre:'Pixabay Music',color:'#ef4444'},{id:6,name:'Mickeyscat',genre:'Pixabay Music',color:'#ec4899'},{id:7,name:'Musicdream',genre:'Pixabay Music',color:'#f97316'},{id:8,name:'SigmaMusicArt',genre:'Pixabay Music',color:'#f59e0b'}], tracks:[{id:1,title:'Carnaval',artist_id:1,artist:'Alec Koff',duration:0,accent:'#8b5cf6'},{id:2,title:'Dark',artist_id:2,artist:'Audiocopper',duration:0,accent:'#64748b'},{id:3,title:'Wonders of the Earth',artist_id:3,artist:'Grand Project',duration:0,accent:'#0ea5e9'},{id:4,title:'Water Afro Pop Music',artist_id:4,artist:'Kontraa',duration:0,accent:'#14b8a6'},{id:5,title:'Sport Sports Rock Music',artist_id:5,artist:'LNPlusMusic',duration:0,accent:'#ef4444'},{id:6,title:'Suspense Tension Horror Trailer',artist_id:5,artist:'LNPlusMusic',duration:0,accent:'#dc2626'},{id:7,title:'Moment of Peace',artist_id:6,artist:'Mickeyscat',duration:0,accent:'#ec4899'},{id:8,title:'Dramatic Cinematic Documentary',artist_id:7,artist:'Musicdream',duration:0,accent:'#f97316'},{id:9,title:'Football Football Music',artist_id:8,artist:'SigmaMusicArt',duration:0,accent:'#f59e0b'},{id:10,title:'No Copyright Music',artist_id:8,artist:'SigmaMusicArt',duration:0,accent:'#eab308'}] };
const fmt = seconds => Number.isFinite(seconds) && seconds > 0 ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2,'0')}` : '--:--';
const Icon = ({ children }) => <span className="icon" aria-hidden="true">{children}</span>;

function App() {
  const [data, setData] = useState(withAudioPaths(demo));
  const [source, setSource] = useState('modo demonstração');
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState('');
  const [vibe, setVibe] = useState('Tudo');
  const [favorites, setFavorites] = useState(() => new Set());
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const featured = data.tracks[0];
  const artists = data.artists.slice(0, 5);

  useEffect(() => {
    fetch(`${API}/api/catalog`).then(r => r.ok ? r.json() : Promise.reject()).then(d => { setData(withAudioPaths(d)); setSource('catálogo D1'); }).catch(() => {});
  }, []);
  useEffect(() => { if (active && audioRef.current) audioRef.current.play().catch(() => {}); }, [active]);

  const visibleTracks = useMemo(() => data.tracks.filter(track => {
    const matchQuery = `${track.title} ${track.artist}`.toLowerCase().includes(query.toLowerCase());
    return matchQuery && (vibe === 'Tudo' || track.vibe === vibe);
  }), [data.tracks, query, vibe]);
  const selectTrack = track => { setActive(track); setProgress(0); setDuration(track.duration || 0); };
  const toggleFavorite = (event, id) => { event.stopPropagation(); setFavorites(current => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; }); };
  const playAdjacent = direction => {
    if (!active) return selectTrack(data.tracks[0]);
    const index = data.tracks.findIndex(track => track.id === active.id);
    selectTrack(data.tracks[(index + direction + data.tracks.length) % data.tracks.length]);
  };
  const seek = event => { const next = Number(event.target.value); if (audioRef.current) audioRef.current.currentTime = next; setProgress(next); };

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#home">sound<span>wave</span></a>
      <nav aria-label="Navegação principal">
        <a className="nav-item active" href="#home"><Icon>⌂</Icon>Início</a>
        <a className="nav-item" href="#discover"><Icon>⌕</Icon>Descobrir</a>
        <a className="nav-item" href="#library"><Icon>♬</Icon>Sua biblioteca</a>
      </nav>
      <div className="sidebar-section"><p>SUA COLEÇÃO</p><a href="#favorites"><Icon>♥</Icon>Favoritas <b>{favorites.size}</b></a><a href="#catalog"><Icon>≡</Icon>Catálogo completo</a></div>
      <div className="sidebar-foot"><span className="status-dot" />{source}</div>
    </aside>

    <main className="content" id="home">
      <header className="topbar">
        <div className="crumb"><span>Para você</span><strong>Início</strong></div>
        <label className="search"><Icon>⌕</Icon><input aria-label="Buscar no catálogo" placeholder="O que você quer ouvir?" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <a className="credits-link" href="https://github.com/candidozara/Clone-spotify/blob/main/CREDITS.md" target="_blank" rel="noreferrer">Créditos</a>
      </header>

      <section className="hero-card" aria-labelledby="hero-title" style={{ '--hero-image': `url(/images/hero/soundwave-hero-background.webp)` }}>
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-copy"><p className="kicker">SELEÇÃO EM DESTAQUE</p><h1 id="hero-title">Som para cada<br/><em>momento seu.</em></h1><p>Encontre trilhas que acompanham o seu ritmo, do foco à celebração.</p><div className="hero-actions"><button className="primary-play" onClick={() => selectTrack(featured)}><Icon>▶</Icon>Ouvir agora</button><a href="#discover" className="secondary-action">Explorar seleções <b>→</b></a></div></div>
        {featured && <button className="feature-art" onClick={() => selectTrack(featured)} aria-label={`Ouvir ${featured.title}`}><img src={featured.cover_path} alt=""/><i>▶</i></button>}
      </section>

      <section className="quick-picks" aria-label="Atalhos de descoberta">
        <button onClick={() => { setVibe('Energia'); document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'}); }}><span className="pick-icon energy">↗</span><strong>Para dar energia</strong><small>Ritmo para avançar</small></button>
        <button onClick={() => { setVibe('Calma'); document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'}); }}><span className="pick-icon calm">☾</span><strong>Para desacelerar</strong><small>Pausa para respirar</small></button>
        <button onClick={() => { setVibe('Cinemática'); document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'}); }}><span className="pick-icon cinema">✦</span><strong>Para imaginar</strong><small>Trilhas em movimento</small></button>
      </section>

      <section className="artist-showcase" id="artists" aria-labelledby="artists-title"><div className="section-title"><div><p className="kicker">QUEM FAZ O SOM</p><h2 id="artists-title">Conheça os artistas</h2></div><span>Identidades visuais originais</span></div><div className="artist-gallery">{data.artists.map(artist => <button className="artist-card" key={artist.id} onClick={() => { setQuery(artist.name); setVibe('Tudo'); document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'}); }}><div className="portrait-slot"><img src={artist.image_path} alt=""/><small>ARTE<br/>EDITORIAL</small><i>+</i></div><div className="artist-card-copy"><strong>{artist.name}</strong><span>{artist.genre}</span><em>Ver faixas <b>→</b></em></div></button>)}</div><p className="photo-disclaimer">Identidades visuais originais para o catálogo; créditos musicais preservados.</p></section>

      <section className="discover" id="discover"><div className="section-title"><div><p className="kicker">EXPLORE POR CLIMA</p><h2>Feito para o seu agora</h2></div><span>{data.tracks.length} faixas disponíveis</span></div><div className="vibe-tabs">{['Tudo','Energia','Calma','Cinemática','Festa','Noturna'].map(item => <button key={item} className={vibe === item ? 'selected' : ''} onClick={() => setVibe(item)}>{item}</button>)}</div></section>

      <section className="catalog-grid" id="catalog"><div className="track-panel"><div className="list-heading"><h2>Faixas para você</h2><button className="text-button" onClick={() => { setVibe('Tudo'); setQuery(''); }}>Limpar filtros</button></div><div className="track-list">{visibleTracks.length ? visibleTracks.map((track, index) => <div className={`track-row ${active?.id === track.id ? 'playing' : ''}`} key={track.id} role="button" tabIndex="0" onClick={() => selectTrack(track)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectTrack(track); } }}> <span className="track-index">{active?.id === track.id ? <i className="equalizer">▮▮▮</i> : String(index + 1).padStart(2,'0')}</span><img className="artwork" src={track.cover_path} alt=""/><span className="track-meta"><strong>{track.title}</strong><small>{track.artist} · {track.vibe}</small></span><span className="track-duration">{fmt(track.duration)}</span><span className="row-actions"><button className={favorites.has(track.id) ? 'favorite saved' : 'favorite'} onClick={event => toggleFavorite(event, track.id)} aria-label="Adicionar aos favoritos">♥</button><span className="play-mini">▶</span></span></div>) : <div className="empty-state"><b>Nenhuma faixa encontrada</b><span>Tente buscar por outro termo ou escolha outro clima.</span></div>}</div></div>
        <aside className="right-rail" id="library"><div className="rail-card"><p className="kicker">CONTRIBUIDORES</p><h3>Vozes deste catálogo</h3>{artists.map(artist => <div className="artist" key={artist.id}><img className="artist-avatar" src={artist.image_path} alt=""/><span><strong>{artist.name}</strong><small>{artist.genre}</small></span><b>›</b></div>)}<a href="https://github.com/candidozara/Clone-spotify/blob/main/CREDITS.md" target="_blank" rel="noreferrer">Ver todos os créditos →</a></div><div className="rail-note"><span>✦</span><p>Faixas de demonstração com atribuição preservada.</p></div></aside>
      </section>

      <footer>Um catálogo musical criado para demonstrar React, Vite, Cloudflare Workers e D1, com faixas de demonstração devidamente creditadas.</footer>
    </main>

    <nav className="mobile-nav" aria-label="Navegação móvel"><a className="active" href="#home">⌂<span>Início</span></a><a href="#discover">⌕<span>Explorar</span></a><a href="#library">♬<span>Biblioteca</span></a></nav>
    {active && <section className="player" aria-label="Reprodutor atual"><div className="now-art"><img src={active.cover_path} alt=""/></div><div className="now-meta"><strong>{active.title}</strong><span>{active.artist}</span></div><div className="player-center"><div className="player-controls"><button onClick={() => playAdjacent(-1)} aria-label="Faixa anterior">↶</button><button className="pause-play" onClick={() => audioRef.current?.paused ? audioRef.current.play() : audioRef.current?.pause()} aria-label="Pausar ou reproduzir">▶</button><button onClick={() => playAdjacent(1)} aria-label="Próxima faixa">↷</button></div><div className="timeline"><span>{fmt(progress)}</span><input aria-label="Progresso da faixa" type="range" min="0" max={duration || 1} value={Math.min(progress, duration || 1)} onChange={seek}/><span>{fmt(duration)}</span></div></div><button className="close-player" onClick={() => { audioRef.current?.pause(); setActive(null); }} aria-label="Fechar player">×</button><audio ref={audioRef} autoPlay src={active.audio_path} onLoadedMetadata={event => setDuration(event.currentTarget.duration)} onTimeUpdate={event => setProgress(event.currentTarget.currentTime)} onEnded={() => playAdjacent(1)}>Seu navegador não suporta reprodução de áudio.</audio></section>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
