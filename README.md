# SoundWave

Aplicação de portfólio autoral para catálogo e reprodução de música. O frontend usa React + Vite; a API é um Cloudflare Worker; e os metadados ficam no Cloudflare D1 (SQLite). As faixas de demonstração são de contribuidores do Pixabay Music e seus créditos estão em [CREDITS.md](./CREDITS.md).

## Arquitetura

- **Cloudflare Pages:** frontend e até 10 MP3s estáticos.
- **Cloudflare Worker:** `GET /api/catalog`.
- **Cloudflare D1:** contribuidores, faixas e caminhos de áudio.

Os MP3s ficam em `public/audio/` apenas na cópia local usada para o deploy. Essa pasta é ignorada pelo Git e nunca deve ser enviada ao repositório.

## Execução local

```bash
npm install
npm run dev
npm run build
```

Sem a API, o frontend abre com metadados de demonstração. Para reproduzir localmente, coloque os arquivos licenciados em `public/audio/` usando os nomes registrados no seed.

## Provisionar banco e API

1. Autentique o Wrangler na conta Cloudflare:
   ```bash
   npx wrangler login
   ```
2. Crie o banco e copie o `database_id` retornado para `wrangler.toml`:
   ```bash
   npx wrangler d1 create soundwave-catalog
   ```
3. Em uma instalação nova, aplique schema e dados:
   ```bash
   npx wrangler d1 execute soundwave-catalog --remote --file=db/schema.sql
   npx wrangler d1 execute soundwave-catalog --remote --file=db/seed.sql
   ```
4. Em banco já existente sem `audio_path`, aplique a migração antes do seed:
   ```bash
   npx wrangler d1 execute soundwave-catalog --remote --file=db/migrations/001_add_audio_path.sql
   npx wrangler d1 execute soundwave-catalog --remote --file=db/seed.sql
   ```
5. Registre seu subdomínio `workers.dev` no painel Cloudflare, se ainda não existir, e publique a API:
   ```bash
   npm run api:deploy
   ```

## Publicar no Cloudflare Pages sem R2

1. Crie `.env.production` com a URL do Worker:
   ```env
   VITE_API_BASE_URL=https://SEU-WORKER.SEUSUBDOMINIO.workers.dev
   ```
2. Copie os MP3s permitidos para `public/audio/` e confirme que a pasta continua ignorada pelo Git.
3. Gere e publique o build:
   ```bash
   npm run build
   npx wrangler pages project create soundwave --production-branch=main
   npx wrangler pages deploy dist --project-name=soundwave --branch=main
   ```

O Cloudflare Pages Free aceita até 20.000 arquivos por site e até 25 MiB por arquivo estático. Para este projeto, os 10 MP3s totalizam cerca de 35 MB e cada arquivo fica abaixo desse limite.

## Direitos, créditos e licença de uso

O código e a documentação deste projeto estão sob a [Licença de Portfólio SoundWave](./LICENSE.md), atribuída a **Alessandro Candido ([@candidozara](https://github.com/candidozara))**. A licença permite visualizar e avaliar o projeto, mas proíbe republicá-lo, distribuí-lo, fazer deploy de cópias ou apresentá-lo como obra própria sem autorização expressa.

- Não use marca, interface, catálogo, músicas ou arquivos do Spotify.
- Use somente conteúdo próprio ou licenciado para redistribuição.
- Preserve título, contribuidor e origem de cada faixa no [CREDITS.md](./CREDITS.md).
- Antes de qualquer uso público, confira os termos da página de origem de cada áudio.
