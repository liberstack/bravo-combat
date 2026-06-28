# 🚀 Deploy – Bravo Combat

Guia de publicação do site. Por ser 100% estático (HTML + CSS + JS), pode ser hospedado gratuitamente em várias plataformas.

---

## Pré-requisitos antes do deploy

1. Edite o número de WhatsApp real em `js/form.js` (busque por `5531900000000`)
2. Edite o endereço, telefone e e-mail no footer de `index.html` e `legal.html`
3. Substitua os links de Instagram e YouTube no footer
4. Revise os textos de `legal.html` com suporte jurídico se necessário

---

## Desenvolvimento local

Os módulos JS usam `import/export` nativo e **não funcionam via `file://`**. Use um servidor local:

```bash
# Opção 1 — Node.js
npx serve .

# Opção 2 — Python
python3 -m http.server 8000

# Opção 3 — VS Code
# Instale a extensão Live Server e clique em "Go Live"
```

Acesse em `http://localhost:8000` (ou porta indicada).

---

## Opção 1 — Netlify (recomendado, gratuito)

A forma mais simples para sites estáticos.

```
1. Acesse https://netlify.com e crie uma conta
2. No dashboard: Add new site → Deploy manually
3. Arraste a pasta do projeto para a área de upload
4. O site fica online em segundos com URL *.netlify.app
```

Para domínio próprio (ex: `bravocombat.com.br`):

```
Netlify Dashboard → Site → Domain management → Add custom domain
```

---

## Opção 2 — Vercel (gratuito)

```bash
# Instale a CLI (requer Node.js)
npm i -g vercel

# Na pasta do projeto
vercel

# Siga o assistente interativo
# Domínio customizado: vercel → Settings → Domains
```

---

## Opção 3 — GitHub Pages (gratuito)

```bash
# 1. Crie um repositório no GitHub (ex: bravo-combat)
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/seu-usuario/bravo-combat.git
git push -u origin main

# 2. No repositório: Settings → Pages
#    Source: Deploy from branch → main → / (root)
#    O site fica em: https://seu-usuario.github.io/bravo-combat/
```

Para domínio próprio, adicione um arquivo `CNAME` na raiz:

```
bravocombat.com.br
```

---

## Opção 4 — Hospedagem tradicional / cPanel (Hostgator, Locaweb etc.)

```
1. Acesse o Gerenciador de Arquivos do cPanel (ou via FTP)
2. Navegue até public_html/
3. Faça upload mantendo a estrutura de pastas:
   - index.html
   - legal.html
   - style.css
   - js/main.js
   - js/navbar.js
   - js/form.js
   - js/utils.js
   - images/bravo_logo.jpg
4. Acesse o domínio — pronto.
```

Credenciais FTP: cPanel → FTP Accounts.

---

## Estrutura de arquivos para upload

```
public_html/
├── index.html
├── legal.html
├── style.css
├── js/
│   ├── main.js
│   ├── navbar.js
│   ├── form.js
│   └── utils.js
└── images/
    └── bravo_logo.jpg
```

> ⚠️ Mantenha a estrutura de pastas intacta. Os imports em `main.js` e o logo dependem dos caminhos relativos.

---

## Domínio `.com.br`

- [registro.br](https://registro.br) — órgão oficial, ~R$ 40/ano
- Após o registro, aponte os nameservers para a plataforma de hospedagem escolhida

---

## Checklist pós-deploy

- [ ] Site abre corretamente em desktop e mobile
- [ ] Logo carrega (`images/bravo_logo.jpg`)
- [ ] Links da navbar fazem scroll suave para as seções
- [ ] Menu hambúrguer funciona no mobile
- [ ] Formulário abre o WhatsApp com mensagem correta
- [ ] Links `legal.html#privacidade` e `legal.html#termos` funcionam
- [ ] Ano no footer atualizado automaticamente
- [ ] HTTPS ativo (Netlify/Vercel/GitHub Pages ativam automaticamente)