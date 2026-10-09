# Auditoria de redesign — Player G4

## Escopo auditado

- Aplicação React 19 + Vite, de tela única.
- Estilos em CSS puro, concentrados em `src/styles.css`.
- Catálogo público via Cloudflare Worker + D1.
- Reprodução HTML5 de dez faixas de demonstração licenciadas/creditadas, hospedadas como ativos estáticos no Cloudflare Pages e ignoradas pelo Git.

## Estado encontrado

A experiência atual é um catálogo musical de demonstração: navegação lateral, busca, filtros de clima, favoritos apenas em memória, galeria de contribuidores Pixabay e player fixo. Não há rotas, autenticação, módulos, séries, episódios, mentores, histórico persistente nem metadados editoriais reais de aprendizagem.

## Itens preservados

- Catálogo/API/D1 existentes.
- Reprodução, avanço, retrocesso, progresso e busca.
- Áudios e créditos de contribuidores.
- Responsividade de desktop e mobile.

## Itens retirados da experiência exibida

- Linguagem visual de streaming musical genérico.
- Cards de “artistas” e suas identidades visuais de demonstração.
- Filtros por humor musical e copy de descoberta de músicas.
- Gradientes roxos, sombras e tokens sem relação com a marca.

Os assets legados permanecem no repositório sem referência de código até uma autorização explícita para exclusão física.

## Regras de marca confirmadas

Fonte primária: Brand Center oficial, acessado em 9 de outubro de 2026.

| Decisão | Regra confirmada | Fonte |
|---|---|---|
| Logo | SVG oficial `G4 Learning Azul`, sem distorção, rotação ou efeitos | Brand Center → Logos |
| Fundo principal | Royal Silver `#F5F4F3` | Brand Center → Cores |
| Texto/estrutura | Navy Blue `#011422` | Brand Center → Cores |
| Destaque restrito | Royal Golden `#B9915B` | Brand Center → Cores |
| Superfície profunda | Mauá Blue `#031B26` | Brand Center → Cores |
| Apoios | Scaling Blue `#184560`, Founders Red `#441B1B`, Ground Clay `#842E20` | Brand Center → Cores |
| Tipografia disponível | Manrope para interface/corpo; Libre Baskerville para destaques editoriais | Brand Center → Tipografia |
| Tipografia não incorporada | PP Museum requer licença/pacote autorizado; usar fallback sem alegar aplicação da fonte | Brand Center → Tipografia |
| Profundidade | Superfícies planas, bordas finas; sem sombras tridimensionais | Design Tokens internos |
| Voz | Direta, executiva, orientada a método, decisão e aplicação | Brand Voice / Guide |

## Limitações de conteúdo

Os sete temas de Gestão e Estratégia recebidos no brief são tópicos editoriais válidos para organizar a experiência, mas não há episódios, mentores, imagens, durações ou áudios correspondentes no projeto. Portanto, eles serão apresentados como jornada de aprendizagem sem ações de reprodução falsas. As faixas existentes continuam disponíveis somente como uma amostra técnica claramente identificada e com créditos preservados.
