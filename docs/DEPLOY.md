# Deploy

Este site é um conjunto de arquivos estáticos — HTML, CSS, JS, Markdown e imagens. Qualquer plataforma que sirva arquivos estáticos funciona. Não há servidor, banco de dados ou etapa de build envolvida.

As três opções abaixo são gratuitas para projetos estáticos.

---

## GitHub Pages

A forma mais simples se você já usa Git e tem o código num repositório do GitHub.

**1. Suba os arquivos para um repositório:**
```bash
git init
git add .
git commit -m "primeiro commit"
git remote add origin https://github.com/seu-usuario/seu-repo.git
git push -u origin main
```

Se o repositório remoto já existir com commits (ex: README criado pelo GitHub), use:
```bash
git push -u origin main --force
```

**2. Ative o GitHub Pages:**
- Abra o repositório no GitHub
- Vá em **Settings → Pages**
- Em "Source", selecione o branch `main` e a pasta `/ (root)`
- Clique em **Save**

**3. Acesse o site:**
```
https://seu-usuario.github.io/seu-repo/
```

Leva alguns segundos para o site ficar no ar. Qualquer `git push` futuro atualiza automaticamente.

> **Atenção com a pasta `assets/`:** certifique-se de que ela está commitada junto com o restante dos arquivos. O GitHub Pages serve os arquivos exatamente como estão no repositório.

---

## Netlify

Boa opção se você quer deploy via drag-and-drop ou integração com Git.

### Via drag-and-drop (mais rápido)

**1.** Acesse [netlify.com](https://netlify.com) e crie uma conta gratuita.

**2.** Na dashboard, role até o final e encontre a área:
> *"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"*

**3.** Arraste a pasta inteira do projeto (incluindo `assets/`) para essa área.

**4.** O Netlify gera uma URL imediatamente, tipo `https://graceful-example-abc123.netlify.app`. Você pode trocar esse nome nas configurações.

### Via Git (recomendado para atualizações frequentes)

**1.** Suba o código para um repositório no GitHub.

**2.** No Netlify, clique em **"Add new site" → "Import an existing project"**.

**3.** Conecte sua conta do GitHub e selecione o repositório.

**4.** Na tela de configuração de build:
- **Build command:** deixe em branco
- **Publish directory:** `.` (ponto — raiz do projeto)

**5.** Clique em **Deploy site**.

Cada `git push` aciona um novo deploy automaticamente.

---

## Cloudflare Pages

Performance mais alta por conta da CDN global da Cloudflare.

**1.** Acesse [pages.cloudflare.com](https://pages.cloudflare.com) e faça login com uma conta Cloudflare (gratuita).

**2.** Clique em **"Create a project" → "Connect to Git"**.

**3.** Autorize o acesso ao GitHub e selecione o repositório.

**4.** Na tela de configuração:
- **Build command:** deixe em branco
- **Build output directory:** `/` (barra — raiz do projeto)
- **Root directory:** deixe em branco

**5.** Clique em **Save and Deploy**.

O Cloudflare gera uma URL no formato `https://seu-projeto.pages.dev`. Cada push no branch principal aciona deploy automático.

---

## Domínio personalizado

As três plataformas permitem conectar um domínio próprio gratuitamente.

O processo geral é o mesmo nas três:

1. Compre o domínio num registrador (Registro.br, Namecheap, Porkbun, etc.)
2. Nas configurações do site na plataforma, adicione o domínio personalizado
3. A plataforma fornece um registro DNS para configurar (geralmente `CNAME` ou `A`)
4. No painel do seu registrador, adicione esse registro
5. Aguarde a propagação (alguns minutos a 48h)

Certificado SSL/HTTPS é emitido automaticamente em todas as três — não precisa configurar nada manualmente.

---

## Atualizando o conteúdo após o deploy

**Texto e seções** — edite `content.md` ou `legal.md` e faça push:
```bash
git add content.md
git commit -m "atualiza conteúdo"
git push
```

**Fotos da galeria** — substitua os arquivos em `assets/` e, se necessário, atualize os `src` no `index.html`:
```bash
git add assets/ index.html
git commit -m "atualiza galeria"
git push
```

**Com Netlify drag-and-drop** — arraste a pasta do projeto novamente. O Netlify identifica o site existente e faz o update.