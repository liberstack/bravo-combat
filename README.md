# 🥊 Bravo Combat – Landing Page

Site institucional da **Bravo Combat Academia de Artes Marciais**, desenvolvido em HTML, CSS e JavaScript vanilla, sem frameworks ou dependências pesadas.

---

## Estrutura do projeto

```
root/
├── index.html        # Landing page principal
├── legal.html        # Política de Privacidade e Termos de Uso
├── style.css         # Estilos globais
├── js/
│   ├── main.js       # Entry point — inicializa módulos e seta o ano
│   ├── navbar.js     # Scroll state, mobile menu, smooth scroll
│   ├── form.js       # Validação, mensagem WhatsApp, feedback visual
│   └── utils.js      # Scroll-reveal e utilitários avulsos
└── images/
    └── bravo_logo.jpg
```

---

## Seções (index.html)

| Seção | Descrição |
|---|---|
| **Navbar** | Fixa no topo, blur ao rolar, menu hambúrguer mobile |
| **Hero** | Título display + overlay grid estilo ringue + estatísticas |
| **Sobre** | Apresentação da academia com cards numerados |
| **Modalidades** | 6 cards: Kickboxing, Muay Thai, Defesa Pessoal, Kids, Condicionamento, Equipe |
| **Diferenciais** | 6 itens de proposta de valor |
| **Horários** | Tabela semanal de grade de aulas |
| **CTA / Contato** | Formulário que abre WhatsApp com mensagem pré-preenchida |
| **Footer** | Links de navegação, contato e links legais |

---

## Módulos JS

| Arquivo | Responsabilidade |
|---|---|
| `main.js` | Entry point — importa e inicializa os módulos, seta o ano no footer |
| `navbar.js` | Classe `.scrolled` ao rolar, toggle mobile, smooth scroll com offset da navbar |
| `form.js` | Validação de campos, montagem da mensagem, abertura do WhatsApp, feedback inline |
| `utils.js` | Scroll-reveal via `IntersectionObserver`, utilitários sem módulo próprio |

> Os módulos usam `import/export` nativo (ES Modules). O `<script>` no HTML usa `type="module"`.  
> ⚠️ Módulos ES não funcionam via `file://` — use um servidor local para desenvolver (ver DEPLOY.md).

---

## Tecnologias

- **HTML5** semântico
- **CSS3** — variáveis, grid, flexbox, `clamp()`, `backdrop-filter`
- **JavaScript** vanilla ES6+ com ES Modules — sem jQuery, sem frameworks
- **Google Fonts** via CDN: `Bebas Neue` (display) + `Inter` (corpo)

Nenhuma outra dependência externa.

---

## Personalização

Antes de publicar, edite os seguintes valores em `index.html` e `legal.html`:

```
# Contato
Telefone:  (31) 9 0000-0000  →  número real
WhatsApp:  5531900000000      →  número real (somente dígitos, com DDI)  ←  também em js/form.js
E-mail:    contato@bravocombat.com.br
Endereço:  Rua dos Campeões, 42 – Centro

# Redes sociais (footer)
Links Instagram e YouTube → URLs reais
```

Para trocar cores, edite as variáveis CSS no topo de `style.css`:

```css
:root {
  --red:        #C8000A;
  --red-bright: #FF1A1A;
  /* ... */
}
```

---

## Acessibilidade & Performance

- Responsivo de 320px a 1920px+
- `prefers-reduced-motion` respeitado
- Atributos `aria-label`, `role` e `aria-selected` nas tabs e botões
- Scroll-reveal via `IntersectionObserver` (sem biblioteca)
- Imagens com `alt` descritivo

---

## Legal

Conteúdo de `legal.html` inclui:

- **Política de Privacidade** — adequada à LGPD (Lei 13.709/2018)
- **Termos de Uso** — foro em Belo Horizonte/MG

> ⚠️ Revise com um profissional jurídico antes de publicar em produção.