-- Catálogo editorial G4 Gestão e Estratégia.
-- Não remove tabelas de demonstração legadas; a API passa a consultar somente estas tabelas.
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

INSERT OR IGNORE INTO learning_modules (id, module_number, pillar, title, short_description, long_description, application_question, tags_json, availability, sort_order) VALUES
(1, 1, 'Legado', 'Governança: como preparar a empresa para crescer além do fundador', 'Estruture as bases de decisão, responsabilidades e gestão para que a empresa cresça com mais clareza e continuidade.', 'Quando a empresa cresce, decisões informais e dependência de poucas pessoas podem se tornar limites. Explore quando estruturar a governança, como pensar acordos de acionistas, definir alçadas entre sócios e administração e usar o sistema de gestão como base para o crescimento.', 'Quais decisões ainda dependem de acordos informais ou da intervenção direta do fundador?', '["Governança","Sistema de gestão","Sociedade","Alçadas","Acordo de acionistas","Legado"]', 'coming_soon', 1),
(2, 2, 'Estratégia e Gestão', 'Do mercado às metas: transforme ambição em estratégia', 'Conecte oportunidades de mercado, posicionamento e objetivos a escolhas e indicadores concretos.', 'Uma estratégia útil parte da leitura do mercado e do posicionamento real da empresa. Explore como analisar concorrentes, reconhecer o potencial de mercado, construir uma visão de longo prazo e transformar ambições em ações com metas e indicadores claros.', 'Qual oportunidade relevante a empresa ainda não transformou em uma escolha estratégica explícita?', '["Estratégia","Mercado","Concorrência","Posicionamento","Metas","Indicadores"]', 'coming_soon', 2),
(3, 3, 'Comando', 'O próximo estágio da empresa começa com o papel do fundador', 'Reavalie como tempo, energia e capital do fundador influenciam a próxima fase do negócio.', 'O papel do fundador muda conforme a empresa evolui. Este conteúdo aborda decisões que continuam sendo responsabilidade do fundador, transições de papel, alocação de recursos, construção de cultura, desenvolvimento de lideranças e uso de inteligência artificial no dia a dia da alta gestão.', 'O que ainda depende de você que deveria estar sendo desenvolvido como capacidade da organização?', '["Fundador","Liderança","Cultura","C-level","Alocação de recursos","IA","Perenidade"]', 'coming_soon', 3),
(4, 4, 'Comando', 'Cultura que acelera a estratégia — e aparece nas decisões diárias', 'Entenda como missão, metas, comportamentos e rituais se conectam à execução.', 'Cultura não é apenas discurso: ela se revela nos comportamentos que a empresa incentiva, tolera e repete. Explore como conectar missão e metas a práticas concretas, usando símbolos e rituais organizacionais para sustentar a estratégia.', 'Que comportamento a empresa diz valorizar, mas ainda não reforça de forma consistente?', '["Cultura","Liderança","Comportamentos","Rituais","Missão","Execução"]', 'coming_soon', 4),
(5, 5, 'Estratégia e Gestão / Escala', 'Como construir um motor de vendas que não dependa do fundador', 'Conecte modelo de crescimento, recursos comerciais, marketing e experiência do cliente para ampliar receita.', 'O crescimento comercial exige mais do que esforço individual. Explore como construir um motor de vendas menos dependente do fundador, escolher o modelo de crescimento adequado e integrar vendas, marketing, marca, experiência do cliente e comunidade. O módulo também aborda o uso de IA para ganhos de eficiência comercial.', 'Qual etapa do seu motor comercial ainda depende de esforço manual ou da presença do fundador?', '["Vendas","Receita","SLG","MLG","PLG","Marketing","Branding","CX","Comunidade","IA"]', 'coming_soon', 5),
(6, 6, 'Escala', 'Crescer com margem: encontre o próximo gargalo do negócio', 'Identifique gargalos, oportunidades e alocação de recursos para crescer com margem e previsibilidade.', 'Crescimento sustentável exige entender em que fase a empresa está, onde estão os gargalos e quais oportunidades fazem sentido para o mercado e para a estratégia. Explore vantagem competitiva, alocação de recursos e aplicações de IA para automatizar processos e apoiar o crescimento.', 'O que hoje limita o crescimento: mercado, processo, pessoas, capacidade de execução ou alocação de recursos?', '["Growth","Crescimento","Gargalos","Vantagem competitiva","Margem","Escala","Previsibilidade","Automação","IA"]', 'coming_soon', 6),
(7, 7, 'Aliança', 'IA na alta gestão: mais capacidade de análise, melhores decisões', 'Explore como a inteligência artificial pode apoiar decisões críticas, gestão e inovação com responsabilidade.', 'A IA passa a fazer parte das conversas estratégicas de empresas e conselhos. Este conteúdo aborda seu papel na alta gestão, a ampliação da capacidade de análise, a aceleração de decisões e os cuidados com ética, confiança e governança.', 'Qual decisão ou processo poderia ganhar qualidade com IA — e quais controles seriam necessários para usá-la com confiança?', '["Inteligência Artificial","Alta gestão","Board","Decisão","Ética","Governança","Marketing","Vendas","Pessoas","Inovação"]', 'coming_soon', 7);
