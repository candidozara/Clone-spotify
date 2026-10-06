-- Metadata must identify the original contributors of the downloaded audio.
INSERT OR REPLACE INTO artists (id,name,genre,color) VALUES
(1,'Alec Koff','Pixabay Music','#8b5cf6'),(2,'Audiocopper','Pixabay Music','#64748b'),
(3,'Grand Project','Pixabay Music','#0ea5e9'),(4,'Kontraa','Pixabay Music','#14b8a6'),
(5,'LNPlusMusic','Pixabay Music','#ef4444'),(6,'Mickeyscat','Pixabay Music','#ec4899'),
(7,'Musicdream','Pixabay Music','#f97316'),(8,'SigmaMusicArt','Pixabay Music','#f59e0b');

INSERT OR REPLACE INTO tracks (id,title,artist_id,duration,accent) VALUES
(1,'Carnaval',1,0,'#8b5cf6'),(2,'Dark',2,0,'#64748b'),(3,'Wonders of the Earth',3,0,'#0ea5e9'),
(4,'Water Afro Pop Music',4,0,'#14b8a6'),(5,'Sport Sports Rock Music',5,0,'#ef4444'),
(6,'Suspense Tension Horror Trailer',5,0,'#dc2626'),(7,'Moment of Peace',6,0,'#ec4899'),
(8,'Dramatic Cinematic Documentary',7,0,'#f97316'),(9,'Football Football Music',8,0,'#f59e0b'),
(10,'No Copyright Music',8,0,'#eab308');
