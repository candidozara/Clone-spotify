# SoundWave — Plataforma de Streaming Musical

Uma plataforma autoral de música criada como projeto de estudo e portfólio, explorando experiências modernas de descoberta e reprodução de áudio na web.

## Sobre o projeto

O SoundWave é um projeto acadêmico e de portfólio inspirado em padrões de experiência de plataformas de streaming, como descoberta de faixas, busca, catálogos e reprodução contínua. Ele foi desenvolvido para praticar a criação de uma aplicação web musical completa, com interface responsiva e dados persistentes na nuvem.

Durante o desenvolvimento, foram praticados conceitos como:

- Manipulação de áudio no navegador com o elemento `audio`.
- Consumo de API para carregar artistas e faixas.
- Construção de uma interface responsiva para desktop e celular.
- Busca, filtros por clima musical e descoberta por artista.
- Gerenciamento de estado no React para player, favoritos e catálogo.
- Deploy de frontend, API e banco de dados em serviços Cloudflare.

> O SoundWave é um projeto independente e não possui vínculo, afiliação ou uso de marca, interface, músicas ou arquivos do Spotify.

## Funcionalidades principais

### Disponíveis

- Player de música persistente com progresso, avanço, retrocesso e encerramento da reprodução.
- Catálogo com 10 faixas de demonstração devidamente creditadas.
- Busca por título ou artista.
- Filtros de descoberta por clima: Energia, Calma, Cinemática, Festa e Noturna.
- Galeria visual de artistas/contribuidores com espaços preparados para fotos autorizadas.
- Atalho para visualizar as faixas de cada artista.
- Favoritos locais durante a sessão de navegação.
- Design responsivo para desktop e dispositivos móveis.
- API pública para o catálogo musical com dados persistidos no Cloudflare D1.

### Em evolução

- Criação e salvamento de playlists personalizadas.
- Perfis e preferências persistentes de usuários.
- Página individual para cada artista.
- Fila de reprodução e histórico de faixas ouvidas.

## Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Interface | [React](https://react.dev/), [Vite](https://vite.dev/), JavaScript, HTML e CSS |
| API | [Cloudflare Workers](https://workers.cloudflare.com/) |
| Banco de dados | [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite) |
| Hospedagem | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Ferramentas | [Wrangler](https://developers.cloudflare.com/workers/wrangler/) e Git/GitHub |

## Links úteis e referências

- [Acessar o SoundWave publicado](https://soundwave-1au.pages.dev)
- [Repositório no GitHub](https://github.com/candidozara/Clone-spotify)
- [API pública do catálogo](https://soundwave-api.candidozara.workers.dev/api/catalog)
- [Créditos das faixas de demonstração](./CREDITS.md)
- [Licença de uso do projeto](./LICENSE.md)
- [Adicionar referência visual no Figma](https://www.figma.com/) — substitua este link pelo protótipo do projeto quando ele existir.
- [Documentação do React](https://react.dev/learn)
- [Documentação do Cloudflare Workers](https://developers.cloudflare.com/workers/)

## Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior.
- [Git](https://git-scm.com/).

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/candidozara/Clone-spotify.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd Clone-spotify
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra no navegador o endereço exibido pelo Vite — normalmente [http://localhost:5173](http://localhost:5173).

### Build de produção

Para gerar uma versão otimizada do frontend:

```bash
npm run build
```

Os arquivos de produção serão criados na pasta `dist/`.

### Áudios de demonstração no ambiente local

Os MP3s não são enviados ao GitHub. Para reproduzir áudio localmente, inclua apenas arquivos autorizados em `public/audio/`, usando os nomes indicados em [CREDITS.md](./CREDITS.md). A pasta `public/audio/` permanece ignorada pelo Git.

## Arquitetura e deploy

- O frontend e os áudios de demonstração são publicados no [Cloudflare Pages](https://pages.cloudflare.com/).
- A API `GET /api/catalog` é executada no [Cloudflare Workers](https://workers.cloudflare.com/).
- Artistas, faixas e caminhos de áudio são armazenados no [Cloudflare D1](https://developers.cloudflare.com/d1/).

Para publicar alterações do frontend:

```bash
npm run build
npx wrangler pages deploy dist --project-name=soundwave --branch=main
```

## Créditos, direitos e licença

- As faixas de demonstração foram obtidas de contribuidores do Pixabay Music; os créditos estão em [CREDITS.md](./CREDITS.md).
- Use apenas conteúdo próprio ou devidamente licenciado em qualquer versão pública do projeto.
- O código e a documentação seguem a [Licença de Portfólio SoundWave](./LICENSE.md), atribuída a **Alessandro Candido ([@candidozara](https://github.com/candidozara))**.
- É permitido visualizar e avaliar o projeto; é proibido republicá-lo, distribuí-lo, hospedá-lo como cópia ou apresentá-lo como obra própria sem autorização expressa.
