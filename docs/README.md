# Bravo Combat — Site Institucional

Site estático para academia de kickboxing. Feito com HTML, CSS e JavaScript puro — sem framework, sem bundler, sem etapa de build. O conteúdo principal fica em dois arquivos Markdown editáveis, e a galeria de fotos fica diretamente no HTML.

---

## O que este projeto faz

O site lê dois arquivos `.md` em tempo de execução e monta as seções dinamicamente:

- `content.md` — hero, seções de conteúdo e contato
- `legal.md` — página de termos de uso e privacidade

A galeria de fotos é estática — as imagens ficam na pasta `assets/` e os cards ficam no `index.html`. Para adicionar ou trocar fotos, edite diretamente o HTML.

---

## Estrutura de arquivos

```
/
├── index.html       # Estrutura HTML — nav, hero, galeria, footer
├── style.css        # Visual completo — tokens, layout, responsivo
├── app.js           # Lógica principal: fetch, parse, roteamento por hash
├── ui.js            # Comportamentos visuais: scroll, nav, hamburger, reveal
├── marked.min.js    # Parser de Markdown (local, sem CDN obrigatório)
├── content.md       # ← AQUI você edita o conteúdo do site
├── legal.md         # ← AQUI você edita os termos e privacidade
├── assets/          # Imagens do site (logo, fotos da galeria)
│   ├── bravo_logo.jpg
│   └── ...
├── README.md        # Este arquivo
└── DEPLOY.md        # Instruções de publicação
```

---

## Como editar o conteúdo

### Página principal — `content.md`

O arquivo é dividido em blocos separados por `---`. Cada bloco vira uma seção do site.

**Bloco 0 — Hero** (título e descrição):
```md
# Nome da Academia

Parágrafo de apresentação que aparece abaixo do título no hero.
```

**Blocos seguintes — Seções** (na ordem em que aparecem):

| Bloco | ID gerado | Âncora na nav |
|-------|-----------|---------------|
| 1º após `---` | `#escola` | — |
| 2º após `---` | `#diferenciais` | — |
| 3º após `---` | `#contato` | Contato |

O tipo de layout de cada seção é detectado automaticamente:

- Bloco com `### Subtítulos` → **cards** em grid
- Bloco com `- lista` → **lista** com marcadores estilizados
- Bloco só com parágrafos → **texto corrido**

### Galeria de fotos

A galeria fica no `index.html`. Para trocar uma foto, substitua o arquivo em `assets/` e atualize o `src` e o `alt` do `<img>` correspondente. Para adicionar um card novo, copie um bloco `.photo-card` existente e ajuste.

### Página legal — `legal.md`

Markdown livre. Suporta `# h1`, `## h2`, `### h3`, listas, negrito, links e `---` como divisor.

---

## Como rodar localmente

O site usa `fetch()` para ler os arquivos `.md`, então precisa de um servidor HTTP local — não funciona abrindo o `index.html` direto pelo sistema de arquivos (`file://`).

**Opção 1 — Python:**
```bash
python3 -m http.server 8080
```
Acesse: `http://localhost:8080`

**Opção 2 — Node.js:**
```bash
npx serve .
```

**Opção 3 — Live Server (VS Code):**
Clique com o botão direito no `index.html` → "Open with Live Server".

---

## Como o roteamento funciona

O site usa hash routing — a URL muda mas a página não recarrega.

- `seusite.com/` → página principal
- `seusite.com/#galeria` → rola até a galeria
- `seusite.com/#contato` → rola até o contato
- `seusite.com/#legal` → exibe a view de termos, esconde o conteúdo principal

Tudo acontece no browser via `hashchange`. Não há servidor envolvido.

---

## Dependências

| Dependência | Como é carregada |
|-------------|-----------------|
| [marked.js](https://github.com/markedjs/marked) | Local (`marked.min.js`), com fallback automático para CDN se o arquivo local falhar |
| Bebas Neue | Google Fonts (requer conexão) |
| Barlow | Google Fonts (requer conexão) |

Sem `npm install`. Sem `package.json`. Sem build.

---

## Personalização rápida

As cores ficam nas variáveis CSS no topo do `style.css`:

```css
:root {
  --red: #CC0000;          /* cor de destaque principal */
  --red-bright: #FF1A1A;   /* hover e destaques secundários */
  --white: #F5F5F5;        /* texto principal */
  --black: #0A0A0A;        /* fundo principal */
  --gray: #1a1a1a;         /* fundo dos cards */
}
```

Para mudar o nome e o logo na nav e no footer, edite diretamente o `index.html` — são elementos estáticos nas classes `.nav-logo` e `.footer-brand`.

Os números do hero (anos, alunos, campeões, dias) também ficam no `index.html`, dentro dos `.stat-item`. Edite o `.stat-num` e o `.stat-label` de cada um.