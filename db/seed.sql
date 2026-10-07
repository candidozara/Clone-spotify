-- Metadata must identify the original contributors of the downloaded audio.
INSERT OR REPLACE INTO artists (id,name,genre,color) VALUES
(1,'Alec Koff','Pixabay Music','#8b5cf6'),(2,'Audiocopper','Pixabay Music','#64748b'),
(3,'Grand Project','Pixabay Music','#0ea5e9'),(4,'Kontraa','Pixabay Music','#14b8a6'),
(5,'LNPlusMusic','Pixabay Music','#ef4444'),(6,'Mickeyscat','Pixabay Music','#ec4899'),
(7,'Musicdream','Pixabay Music','#f97316'),(8,'SigmaMusicArt','Pixabay Music','#f59e0b');

INSERT OR REPLACE INTO tracks (id,title,artist_id,duration,accent,audio_path) VALUES
(1,'Carnaval',1,0,'#8b5cf6','/audio/alec_koff-carnaval-484622.mp3'),
(2,'Dark',2,0,'#64748b','/audio/audiocopper-dark-571483.mp3'),
(3,'Wonders of the Earth',3,0,'#0ea5e9','/audio/grand_project-wonders-of-the-earth-550792.mp3'),
(4,'Water Afro Pop Music',4,0,'#14b8a6','/audio/kontraa-water-afro-pop-music-445661.mp3'),
(5,'Sport Sports Rock Music',5,0,'#ef4444','/audio/lnplusmusic-sport-sports-rock-music-597971.mp3'),
(6,'Suspense Tension Horror Trailer',5,0,'#dc2626','/audio/lnplusmusic-suspense-tension-horror-trailer-323181.mp3'),
(7,'Moment of Peace',6,0,'#ec4899','/audio/mickeyscat-moment-of-peace-mickeyscat-554494.mp3'),
(8,'Dramatic Cinematic Documentary',7,0,'#f97316','/audio/musicdream-dramatic-cinematic-documentary-609202.mp3'),
(9,'Football Football Music',8,0,'#f59e0b','/audio/sigmamusicart-football-football-music-551346.mp3'),
(10,'No Copyright Music',8,0,'#eab308','/audio/sigmamusicart-no-copyright-music-537751.mp3');
