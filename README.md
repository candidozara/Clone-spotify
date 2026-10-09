# G4 Gestão e Estratégia — Áudio

Uma experiência editorial de aprendizagem em áudio, desenvolvida como exercício de interface e portfólio durante a pós-graduação em IA Aplicada da UNIPDS. O projeto combina uma jornada de Gestão e Estratégia com um player funcional de demonstração técnica.

## O que é este projeto

A interface organiza uma jornada em sete frentes estratégicas:

1. Governança, sistema de gestão e sociedade
2. Planejamento estratégico na prática
3. O papel do fundador
4. Cultura: a 6ª marcha da estratégia
5. Ecossistema de vendas
6. Mentalidade de Growth
7. Inteligência Artificial estratégica

Esses temas compõem a estrutura editorial da experiência. Este repositório **não contém episódios, mentores, imagens ou áudios oficiais desses módulos**. A biblioteca reproduz dez faixas licenciadas e creditadas somente para validar a tecnologia do player; elas não representam conteúdo educacional G4.

## Experiência implementada

- Interface editorial responsiva para desktop e celular.
- Navegação entre Início, Jornada e Biblioteca.
- Jornada com sete módulos estratégicos, sem ações que simulem conteúdo inexistente.
- Busca por título ou contribuinte na biblioteca de demonstração.
- Favoritos persistidos localmente no navegador.
- Histórico local de faixas recentes.
- Player persistente com reprodução, pausa, avanço, retrocesso, troca de faixa e barra de progresso.
- Catálogo público via Cloudflare Worker e dados persistidos no Cloudflare D1.

## Direção de design

O redesign utiliza o logo autorizado G4 Learning e regras confirmadas no Brand Center: Navy Blue, Royal Golden, Royal Silver e tipografia Manrope/Libre Baskerville. A fonte PP Museum não foi incluída porque requer licença/pacote autorizado. As decisões e limites de conteúdo estão documentados em [`docs/REDESIGN-AUDIT.md`](./docs/REDESIGN-AUDIT.md).

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Interface | [React](https://react.dev/), [Vite](https://vite.dev/), JavaScript, HTML e CSS |
| API | [Cloudflare Workers](https://workers.cloudflare.com/) |
| Banco de dados | [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite) |
| Hospedagem | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Ferramentas | [Wrangler](https://developers.cloudflare.com/workers/wrangler/) e Git/GitHub |

## Links

- [Abrir a versão publicada](https://soundwave-1au.pages.dev)
- [Repositório no GitHub](https://github.com/candidozara/Clone-spotify)
- [API pública do catálogo](https://soundwave-api.candidozara.workers.dev/api/catalog)
- [Créditos das faixas de demonstração](./CREDITS.md)
- [Licença de uso do projeto](./LICENSE.md)

## Executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [Git](https://git-scm.com/)

```bash
git clone https://github.com/candidozara/Clone-spotify.git
cd Clone-spotify
npm install
npm run dev
```

Abra o endereço indicado pelo Vite, normalmente [http://localhost:5173](http://localhost:5173).

### Build de produção

```bash
npm run build
```

Os arquivos de produção são criados em `dist/`.

### Áudios de demonstração no ambiente local

Os MP3s não são enviados ao GitHub. Para habilitar a reprodução local, inclua somente arquivos autorizados em `public/audio/`, com os nomes indicados em [`CREDITS.md`](./CREDITS.md). A pasta continua ignorada pelo Git.

## Arquitetura e deploy

- Frontend e áudios de demonstração: [Cloudflare Pages](https://pages.cloudflare.com/).
- Catálogo `GET /api/catalog`: [Cloudflare Workers](https://workers.cloudflare.com/).
- Artistas, faixas e caminhos de áudio: [Cloudflare D1](https://developers.cloudflare.com/d1/).

Para publicar alterações no frontend:

```bash
npm run build
npx wrangler pages deploy dist --project-name=soundwave --branch=main
```

## Créditos, direitos e licença

- As faixas de demonstração vêm de contribuidores do Pixabay Music. Consulte os créditos completos em [`CREDITS.md`](./CREDITS.md).
- Use conteúdo próprio ou devidamente autorizado em qualquer versão pública.
- Código e documentação estão sob a [Licença de Portfólio SoundWave](./LICENSE.md), atribuída a **Alessandro Candido ([@candidozara](https://github.com/candidozara))**.
- É permitido visualizar e avaliar o projeto; é proibido republicá-lo, distribuí-lo, hospedá-lo como cópia, modificá-lo ou apresentá-lo como obra própria sem autorização expressa.
