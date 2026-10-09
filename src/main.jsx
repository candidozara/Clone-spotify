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
const coverPathByTrackId = {
  1: '/images/covers/carnaval.webp', 2: '/images/covers/dark.webp', 3: '/images/covers/wonders-of-the-earth.webp', 4: '/images/covers/water-afro-pop-music.webp',
  5: '/images/covers/sport-sports-rock-music.webp', 6: '/images/covers/suspense-tension-horror-trailer.webp', 7: '/images/covers/moment-of-peace.webp',
  8: '/images/covers/dramatic-cinematic-documentary.webp', 9: '/images/covers/football-football-music.webp', 10: '/images/covers/no-copyright-music.webp'
};
const demo = {
  artists: [
    { id: 1, name: 'Alec Koff', genre: 'Pixabay Music' }, { id: 2, name: 'Audiocopper', genre: 'Pixabay Music' },
    { id: 3, name: 'Grand Project', genre: 'Pixabay Music' }, { id: 4, name: 'Kontraa', genre: 'Pixabay Music' },
    { id: 5, name: 'LNPlusMusic', genre: 'Pixabay Music' }, { id: 6, name: 'Mickeyscat', genre: 'Pixabay Music' },
    { id: 7, name: 'Musicdream', genre: 'Pixabay Music' }, { id: 8, name: 'SigmaMusicArt', genre: 'Pixabay Music' }
  ],
  tracks: [
    { id: 1, title: 'Carnaval', artist_id: 1, artist: 'Alec Koff', duration: 0 }, { id: 2, title: 'Dark', artist_id: 2, artist: 'Audiocopper', duration: 0 },
    { id: 3, title: 'Wonders of the Earth', artist_id: 3, artist: 'Grand Project', duration: 0 }, { id: 4, title: 'Water Afro Pop Music', artist_id: 4, artist: 'Kontraa', duration: 0 },
    { id: 5, title: 'Sport Sports Rock Music', artist_id: 5, artist: 'LNPlusMusic', duration: 0 }, { id: 6, title: 'Suspense Tension Horror Trailer', artist_id: 5, artist: 'LNPlusMusic', duration: 0 },
    { id: 7, title: 'Moment of Peace', artist_id: 6, artist: 'Mickeyscat', duration: 0 }, { id: 8, title: 'Dramatic Cinematic Documentary', artist_id: 7, artist: 'Musicdream', duration: 0 },
    { id: 9, title: 'Football Football Music', artist_id: 8, artist: 'SigmaMusicArt', duration: 0 }, { id: 10, title: 'No Copyright Music', artist_id: 8, artist: 'SigmaMusicArt', duration: 0 }
  ]
};
const modules = [
  ['01', 'Governança, sistema de gestão e sociedade', 'Fundamentos para decisões que sustentam o negócio.'],
  ['02', 'Planejamento estratégico na prática', 'Direção, escolha e execução com método.'],
  ['03', 'O papel do fundador', 'Estratégia, gestão e cultura sob responsabilidade de quem lidera.'],
  ['04', 'Cultura: a 6ª marcha da estratégia', 'Princípios claros para uma operação que não depende do acaso.'],
  ['05', 'Ecossistema de vendas', 'Receita, margem e previsibilidade em uma única visão.'],
  ['06', 'Mentalidade de Growth', 'Crescimento que começa no processo e se prova no resultado.'],
  ['07', 'Inteligência Artificial estratégica', 'IA como aliança para decisões melhores e execução mais rápida.']
];
const enrichCatalog = catalog => ({
  ...catalog,
  tracks: catalog.tracks.map(track => ({ ...track, audio_path: track.audio_path || audioPathByTrackId[track.id], cover_path: track.cover_path || coverPathByTrackId[track.id] }))
});
const fmt = seconds => Number.isFinite(seconds) && seconds > 0 ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '—:—';
const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function App() {
  const [data, setData] = useState(enrichCatalog(demo));
  const [source, setSource] = useState('amostra técnica local');
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('todos');
  const [favorites, setFavorites] = useState(() => new Set(JSON.parse(localStorage.getItem('g4-audio-favorites') || '[]')));
  const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem('g4-audio-recent') || '[]'));
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/catalog`).then(r => r.ok ? r.json() : Promise.reject()).then(catalog => {
      setData(enrichCatalog(catalog));
      setSource('catálogo conectado');
    }).catch(() => {});
  }, []);
  useEffect(() => localStorage.setItem('g4-audio-favorites', JSON.stringify([...favorites])), [favorites]);
  useEffect(() => localStorage.setItem('g4-audio-recent', JSON.stringify(recent)), [recent]);
  useEffect(() => { if (active && audioRef.current) audioRef.current.play().catch(() => setIsPlaying(false)); }, [active]);

  const tracks = useMemo(() => data.tracks.filter(track => {
    const textMatch = `${track.title} ${track.artist}`.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    const filterMatch = filter === 'todos' || (filter === 'favoritos' && favorites.has(track.id)) || (filter === 'recentes' && recent.includes(track.id));
    return textMatch && filterMatch;
  }), [data.tracks, query, filter, favorites, recent]);

  const selectTrack = track => {
    setActive(track); setProgress(0); setDuration(track.duration || 0); setIsPlaying(true);
    setRecent(current => [track.id, ...current.filter(id => id !== track.id)].slice(0, 5));
  };
  const toggleFavorite = id => setFavorites(current => {
    const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next;
  });
  const togglePlayback = () => {
    if (!active) return data.tracks[0] && selectTrack(data.tracks[0]);
    if (audioRef.current?.paused) audioRef.current.play(); else audioRef.current?.pause();
  };
  const playAdjacent = direction => {
    if (!active) return data.tracks[0] && selectTrack(data.tracks[0]);
    const index = data.tracks.findIndex(track => track.id === active.id);
    selectTrack(data.tracks[(index + direction + data.tracks.length) % data.tracks.length]);
  };
  const jump = seconds => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds));
  };
  const seek = event => { const next = Number(event.target.value); if (audioRef.current) audioRef.current.currentTime = next; setProgress(next); };
  const favoriteTracks = data.tracks.filter(track => favorites.has(track.id));

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#inicio" onClick={() => scrollTo('inicio')} aria-label="G4 Learning, início"><img src="/brand/g4-learning-logo-azul.svg" alt="G4 Learning"/></a>
      <p className="nav-label">GESTÃO E ESTRATÉGIA</p>
      <nav aria-label="Navegação principal">
        <button className="nav-item active" onClick={() => scrollTo('inicio')}><span>01</span>Início</button>
        <button className="nav-item" onClick={() => scrollTo('jornada')}><span>02</span>Sua jornada</button>
        <button className="nav-item" onClick={() => scrollTo('biblioteca')}><span>03</span>Biblioteca</button>
      </nav>
      <div className="sidebar-section"><p>SUA BIBLIOTECA</p><button onClick={() => { setFilter('favoritos'); scrollTo('biblioteca'); }}><span>◆</span>Favoritos <b>{favorites.size}</b></button><button onClick={() => { setFilter('recentes'); scrollTo('biblioteca'); }}><span>↺</span>Recentes</button></div>
      <div className="sidebar-foot"><i />{source}</div>
    </aside>

    <main className="content" id="inicio">
      <header className="topbar">
        <p>GESTÃO E ESTRATÉGIA <b>/</b> ÁUDIO</p>
        <label className="search"><span>⌕</span><input aria-label="Buscar na biblioteca de demonstração" placeholder="Buscar na biblioteca" value={query} onChange={event => { setQuery(event.target.value); setFilter('todos'); }}/></label>
        <a className="credits-link" href="https://github.com/candidozara/Clone-spotify/blob/main/CREDITS.md" target="_blank" rel="noreferrer">Créditos da amostra</a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">G4 LEARNING</p><h1 id="hero-title">Conhecimento para decisões que <em>movem o negócio.</em></h1><p className="hero-text">Uma jornada de aprendizagem para líderes que querem construir com método, rigor e visão de longo prazo.</p><button className="primary-action" onClick={() => scrollTo('jornada')}>Conheça a jornada <span>→</span></button></div>
        <div className="hero-mark" aria-hidden="true"><span>G4</span><small>GESTÃO<br/>E ESTRATÉGIA</small></div>
      </section>

      <section className="principles" aria-label="Princípios da experiência"><p><b>Direção</b><span>Estratégia antes de velocidade.</span></p><p><b>Método</b><span>Conteúdo para aplicação real.</span></p><p><b>Rigor</b><span>Decisões sustentadas por processo.</span></p></section>

      <section className="journey" id="jornada" aria-labelledby="journey-title">
        <div className="section-heading"><div><p className="eyebrow">JORNADA DE APRENDIZAGEM</p><h2 id="journey-title">Sua jornada de<br/><em>Gestão e Estratégia.</em></h2></div><p>Sete frentes para estruturar decisões, pessoas e crescimento.</p></div>
        <div className="module-grid">{modules.map(([number, title, description]) => <article className="module-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><i>EM ESTRUTURAÇÃO EDITORIAL</i></article>)}</div>
      </section>

      <section className="library" id="biblioteca" aria-labelledby="library-title">
        <div className="section-heading"><div><p className="eyebrow">AMOSTRA TÉCNICA</p><h2 id="library-title">Biblioteca de áudio.</h2></div><p>Faixas licenciadas para validar a experiência de reprodução. Não fazem parte do conteúdo editorial G4.</p></div>
        <div className="library-toolbar"><div className="filter-tabs" aria-label="Filtros da biblioteca"><button className={filter === 'todos' ? 'selected' : ''} onClick={() => setFilter('todos')}>Todos <b>{data.tracks.length}</b></button><button className={filter === 'favoritos' ? 'selected' : ''} onClick={() => setFilter('favoritos')}>Favoritos <b>{favorites.size}</b></button><button className={filter === 'recentes' ? 'selected' : ''} onClick={() => setFilter('recentes')}>Recentes <b>{recent.length}</b></button></div><button className="text-action" onClick={() => { setFilter('todos'); setQuery(''); }}>Limpar busca e filtros</button></div>
        <div className="catalog-layout"><div className="track-panel"><div className="track-header"><span>CONTEÚDO</span><span>ORIGEM</span><span>AÇÃO</span></div>{tracks.length ? tracks.map(track => <article className={`track-row ${active?.id === track.id ? 'playing' : ''}`} key={track.id}><button className="track-main" onClick={() => selectTrack(track)} aria-label={`Reproduzir ${track.title}`}><img src={track.cover_path} alt=""/><span className="track-meta"><strong>{track.title}</strong><small>Áudio de demonstração</small></span></button><span className="track-origin">{track.artist}<small>Pixabay Music</small></span><div className="row-actions"><button className={favorites.has(track.id) ? 'favorite saved' : 'favorite'} onClick={() => toggleFavorite(track.id)} aria-label={favorites.has(track.id) ? `Remover ${track.title} dos favoritos` : `Adicionar ${track.title} aos favoritos`}>◆</button><button className="play-button" onClick={() => selectTrack(track)} aria-label={`Reproduzir ${track.title}`}>{active?.id === track.id && isPlaying ? 'Ⅱ' : '▶'}</button></div></article>) : <div className="empty-state"><strong>Nenhuma faixa encontrada.</strong><span>Ajuste a busca ou limpe os filtros da biblioteca.</span><button onClick={() => { setFilter('todos'); setQuery(''); }}>Ver biblioteca completa</button></div>}</div>
          <aside className="library-note"><p className="eyebrow">SOBRE ESTA BIBLIOTECA</p><h3>Conteúdo exige contexto.</h3><p>Os áudios desta área existem para testar a experiência técnica de player. Os créditos e licenças permanecem disponíveis no repositório.</p><a href="https://github.com/candidozara/Clone-spotify/blob/main/CREDITS.md" target="_blank" rel="noreferrer">Consultar créditos <span>→</span></a>{favoriteTracks.length > 0 && <div className="favorite-summary"><span>SELECIONADAS</span><strong>{favoriteTracks.length} {favoriteTracks.length === 1 ? 'faixa salva' : 'faixas salvas'}</strong></div>}</aside>
        </div>
      </section>
      <footer><img src="/brand/g4-learning-logo-azul.svg" alt="G4 Learning"/><p>Gestão e Estratégia em áudio. Estrutura de experiência em evolução.</p><a href="https://github.com/candidozara/Clone-spotify" target="_blank" rel="noreferrer">Ver projeto</a></footer>
    </main>

    <nav className="mobile-nav" aria-label="Navegação móvel"><button onClick={() => scrollTo('inicio')}><span>01</span>Início</button><button onClick={() => scrollTo('jornada')}><span>02</span>Jornada</button><button onClick={() => scrollTo('biblioteca')}><span>03</span>Biblioteca</button></nav>
    {active && <section className="player" aria-label="Reprodutor atual"><img className="now-art" src={active.cover_path} alt=""/><div className="now-meta"><strong>{active.title}</strong><span>Áudio de demonstração · {active.artist}</span></div><div className="player-center"><div className="player-controls"><button onClick={() => playAdjacent(-1)} aria-label="Faixa anterior">‹</button><button onClick={() => jump(-15)} aria-label="Voltar 15 segundos">−15</button><button className="pause-play" onClick={togglePlayback} aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}>{isPlaying ? 'Ⅱ' : '▶'}</button><button onClick={() => jump(15)} aria-label="Avançar 15 segundos">+15</button><button onClick={() => playAdjacent(1)} aria-label="Próxima faixa">›</button></div><div className="timeline"><span>{fmt(progress)}</span><input aria-label="Progresso da faixa" type="range" min="0" max={duration || 1} value={Math.min(progress, duration || 1)} onChange={seek}/><span>{fmt(duration)}</span></div></div><button className="close-player" onClick={() => { audioRef.current?.pause(); setActive(null); setIsPlaying(false); }} aria-label="Fechar player">×</button><audio ref={audioRef} autoPlay src={active.audio_path} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onLoadedMetadata={event => setDuration(event.currentTarget.duration)} onTimeUpdate={event => setProgress(event.currentTarget.currentTime)} onEnded={() => playAdjacent(1)}>Seu navegador não suporta reprodução de áudio.</audio></section>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
