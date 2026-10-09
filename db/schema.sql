-- Esquema do catálogo editorial G4 Gestão e Estratégia.
CREATE TABLE IF NOT EXISTS learning_modules (
  id INTEGER PRIMARY KEY,
  module_number INTEGER NOT NULL UNIQUE CHECK(module_number BETWEEN 1 AND 7),
  pillar TEXT NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  application_question TEXT NOT NULL,
  tags_json TEXT NOT NULL DEFAULT '[]',
  availability TEXT NOT NULL DEFAULT 'coming_soon' CHECK(availability IN ('coming_soon', 'published', 'archived')),
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS learning_content (
  id INTEGER PRIMARY KEY,
  module_id INTEGER REFERENCES learning_modules(id),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK(content_type IN ('series_episode', 'mentor_pill', 'case_audio', 'complementary_audio')),
  audio_path TEXT,
  duration_seconds INTEGER,
  availability TEXT NOT NULL DEFAULT 'coming_soon' CHECK(availability IN ('coming_soon', 'published', 'archived')),
  published_at TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  CHECK((availability = 'published' AND audio_path IS NOT NULL AND duration_seconds IS NOT NULL AND duration_seconds > 0) OR availability != 'published')
);
