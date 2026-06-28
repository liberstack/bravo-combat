# Deploy — Bravo Combat

Este é um site **100% estático** (HTML + CSS + JS com ES Modules), sem build
e sem servidor backend. Pode ser publicado em qualquer host de arquivos
estáticos.

## ✅ Checklist antes de publicar

Confira tudo em **`js/config.js`** antes do deploy:

- [ ] `contact.whatsappNumber` com o número real (apenas dígitos + DDI, ex.: `5531999999999`)
- [ ] `contact.phoneDisplay` / `contact.phoneHref` corretos
- [ ] `contact.email` / `contact.emailHref` corretos
- [ ] `contact.emailPrivacidade` / `contact.emailPrivacidadeHref` corretos
- [ ] `contact.address` atualizado
- [ ] `social.instagram` e `social.youtube` (hoje apontam para `"#"` — trocar pelas URLs reais dos perfis)
- [ ] Conteúdo de horários, modalidades e textos em `index.html`
- [ ] Datas de "última atualização" em `legal.html`

## Opção 1 — Netlify (recomendado, gratuito)

**Via arrastar-e-soltar (mais simples):**

1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta `bravo-combat/` inteira
3. Pronto — o Netlify gera uma URL pública na hora

**Via CLI:**

```bash
npm install -g netlify-cli
cd bravo-combat
netlify deploy --prod
```

**Domínio próprio:** em *Site settings → Domain management → Add custom
domain*, e aponte o DNS do seu domínio (registro `CNAME` ou `A`) conforme
instruções do próprio painel.

## Opção 2 — Vercel (gratuito)

```bash
npm install -g vercel
cd bravo-combat
vercel --prod
```

Ou via [vercel.com/new](https://vercel.com/new), importando a pasta/projeto
direto da interface (sem precisar de repositório Git).

## Opção 3 — GitHub Pages (gratuito)

1. Crie um repositório no GitHub e suba o conteúdo da pasta `bravo-combat/`
   (incluindo `index.html` na raiz do repositório).
2. No GitHub: **Settings → Pages → Source**, selecione a branch (ex.: `main`)
   e a pasta raiz (`/`).
3. O site fica disponível em `https://<seu-usuario>.github.io/<repo>/`.

> Para domínio próprio, crie um arquivo `CNAME` na raiz do repositório com o
> domínio desejado e configure o DNS conforme a
> [documentação do GitHub Pages](https://docs.github.com/pages).

## Opção 4 — Hospedagem tradicional (cPanel / FTP)

1. Acesse o painel de hospedagem ou um cliente FTP (FileZilla, etc.).
2. Envie **todo o conteúdo** da pasta `bravo-combat/` para a pasta pública do
   site (geralmente `public_html/` ou `www/`).
3. Garanta que a estrutura de pastas seja preservada exatamente como está
   (`js/`, `images/` no mesmo nível de `index.html`) — os caminhos nos
   arquivos são relativos.

## ⚠️ Pontos de atenção

- **ES Modules exigem HTTP(S):** todos os métodos acima já servem os
  arquivos via HTTP, então não há problema. O único cenário que **não**
  funciona é abrir `index.html` direto do disco (`file://`) — para testar
  localmente, use um servidor local (veja o `README.md`).
- **HTTPS:** Netlify, Vercel e GitHub Pages já fornecem HTTPS automático e
  gratuito. Em hospedagem tradicional, confirme se o provedor oferece
  certificado SSL (Let's Encrypt, geralmente gratuito via cPanel).
- **Cache do navegador:** após atualizar `config.js` ou qualquer outro
  arquivo, se as mudanças não aparecerem, force um refresh
  (`Ctrl+Shift+R` / `Cmd+Shift+R`) — alguns hosts/CDNs cacheiam arquivos
  estáticos agressivamente.