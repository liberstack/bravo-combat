# Bravo Combat — Site institucional

Landing page institucional da **Bravo Combat** (kickboxing, Muay Thai e defesa
pessoal): página principal (`index.html`) + página legal com Política de
Privacidade e Termos de Uso (`legal.html`).

Site estático (HTML, CSS e JavaScript puro com ES Modules), sem build, sem
dependências e sem framework.

## Estrutura do projeto

```
bravo-combat/
├── index.html          → página principal
├── legal.html          → política de privacidade + termos de uso
├── style.css           → estilos globais
├── images/
│   └── bravo_logo.jpg
└── js/
    ├── config.js        → ⭐ configuração central do site
    ├── main.js           → ponto de entrada, importa e inicializa os módulos
    ├── navbar.js         → menu fixo, toggle mobile, scroll suave
    ├── form.js           → validação do form e envio via WhatsApp
    └── utils.js          → scroll-reveal + aplicação do config.js no HTML
```

## `config.js` — fonte única de configuração

Todos os dados que mudam com frequência (telefone, e-mail, endereço, redes
sociais) e os parâmetros de comportamento da UI ficam centralizados em
**`js/config.js`**:

```js
export const CONFIG = {
  site:    { name, fullName },
  contact: { address, phoneDisplay, phoneHref, whatsappNumber, email, emailHref, ... },
  social:  { instagram, youtube },
  ui:      { navScrollThreshold, revealThreshold, revealStaggerStep, feedbackTimeoutMs },
};
```

**Para atualizar telefone, e-mail, endereço ou redes sociais, edite apenas
este arquivo** — o restante do site é alimentado a partir dele:

- `form.js` usa `CONFIG.contact.whatsappNumber` para montar o link do
  WhatsApp do formulário de aula gratuita.
- `navbar.js` e `utils.js` usam `CONFIG.ui.*` para ajustar o comportamento do
  scroll da navbar e das animações de entrada (scroll-reveal).
- `index.html` e `legal.html` têm elementos marcados com os atributos
  `data-config-text` e `data-config-href` (no rodapé e nos links de e-mail),
  que são preenchidos automaticamente em tempo de execução por
  `applyConfig()` (em `utils.js`, chamado a partir de `main.js`).

> O texto/href que já está escrito no HTML é o valor padrão — caso o
> JavaScript não carregue por algum motivo, o site continua exibindo as
> informações corretas (progressive enhancement). O `config.js` apenas
> garante que você não precise editar a mesma informação em vários lugares.

### Exemplo: trocando o número de WhatsApp

```js
// js/config.js
contact: {
  whatsappNumber: "5531999999999", // só dígitos, com DDI
  phoneHref: "tel:+5531999999999",
  phoneDisplay: "(31) 9 9999-9999",
}
```

Isso atualiza automaticamente o link de WhatsApp do formulário **e** o
telefone exibido no rodapé de `index.html` e `legal.html`.

## Rodando localmente

Como os scripts usam `<script type="module">` (ES Modules), os arquivos
**não podem ser abertos direto com duplo-clique** (`file://`) — navegadores
bloqueiam `import` nesse contexto. É necessário um servidor local simples:

```bash
# Python 3
python3 -m http.server 8000

# ou Node (sem instalação global)
npx serve .
```

Depois acesse `http://localhost:8000`.

## Customização rápida

| O que mudar              | Onde                                  |
| ------------------------- | -------------------------------------- |
| Telefone, e-mail, redes   | `js/config.js`                        |
| Textos, seções, horários  | `index.html`                          |
| Política/Termos           | `legal.html`                          |
| Cores, fontes, espaçamentos | `style.css`                         |
| Logo                      | `images/bravo_logo.jpg`               |

## Compatibilidade

Site testado em navegadores modernos (Chrome, Firefox, Safari, Edge) com
suporte a ES Modules e `IntersectionObserver`.

Veja também [`DEPLOY.md`](./DEPLOY.md) para instruções de publicação.