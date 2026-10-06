# SoundWave

Catálogo musical demonstrativo e autoral, criado sem código, marca, imagens ou músicas do Spotify. O frontend usa React + Vite; a API é um Cloudflare Worker e os metadados são persistidos no Cloudflare D1 (SQLite).

## Execução local

```bash
npm install
npm run dev
npm run build
```

Sem a API, o frontend abre com dados de demonstração para desenvolvimento visual.

## Provisionar banco e API

1. Instale/autentique o Wrangler com sua conta Cloudflare: `npx wrangler login`.
2. Crie o banco: `npx wrangler d1 create soundwave-catalog`.
3. Copie o `database_id` retornado para `wrangler.toml`.
4. Aplique o esquema e dados:
   ```bash
   npx wrangler d1 execute soundwave-catalog --remote --file=db/schema.sql
   npx wrangler d1 execute soundwave-catalog --remote --file=db/seed.sql
   ```
5. Publique a API: `npm run api:deploy`.
6. Defina a URL retornada como `VITE_API_BASE_URL` ao publicar o frontend.

## Publicar frontend

O diretório de saída é `dist`. Publique-o como site estático no Cloudflare Pages, Render Static Site ou Vercel. Configure a variável `VITE_API_BASE_URL` com a URL do Worker e execute o build.

## Limites e direitos

O D1 no plano Workers Free oferece armazenamento persistente, sem cobrança por capacidade ociosa e com limites de uso diário. O projeto contém apenas dados fictícios. Para adicionar áudio ou imagens reais, use conteúdo próprio ou licenciado para redistribuição.
