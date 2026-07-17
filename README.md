<div align="center">

<h1>🔥 M.O.B Burger — Landing Page</h1>

<p><strong>Vitrine de marca para uma hamburgueria artesanal — feita para virar pedido</strong></p>

<p>
  <a href="https://mob-burger-landing.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Ver_ao_vivo-mob--burger--landing.vercel.app-FF4500?style=for-the-badge&logo=vercel&logoColor=white" alt="Demo ao vivo"/>
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/status-em_produção-16A34A?style=flat-square" alt="Em produção"/>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=black" alt="GSAP"/>
</p>

<img src="docs/preview.webp" alt="Intro, hero e carrossel de burgers da landing do M.O.B Burger" width="100%"/>

</div>

---

## A ideia

Uma hamburgueria artesanal não compete por preço — compete por desejo. Esta landing existe para fazer o produto parecer tão bom quanto ele é e empurrar o visitante para um único lugar: **fazer o pedido**, direto, sem passar por marketplace nenhum.

Toda decisão visual serve a isso: fundo quase preto para a comida ser a única fonte de luz, tipografia condensada em caixa alta com gradiente de chama, e um CTA que acompanha o scroll do começo ao fim.

---

## ✨ Destaques de engenharia

**Animação com orçamento.** GSAP + ScrollTrigger conduzem intro, hero, reveals com pin e a galeria. Animação aqui é acabamento, não enfeite: cada trecho é disparado por scroll e desmontado quando sai de cena, sem timeline global rodando à toa.

**Direção de arte no CSS.** Os três níveis do hero (MURILO / ORIGINAL'S / BURGER) usam gradientes de chama — dourado → laranja → vermelho — aplicados como `background-clip: text`, sem uma imagem sequer. Texto continua texto: selecionável, acessível e nítido em qualquer densidade de tela.

**Peso onde importa.** Fontes servidas por `next/font` (Bebas Neue no display, DM Sans no corpo), com o custo visual concentrado nas fotos dos produtos — que são o argumento de venda.

**Cursor e microinterações próprios.** Cursor customizado, botões magnéticos, marquee contínuo e texto com efeito scramble dão à página uma identidade que um template não entrega.

---

## 🧩 Composição da página

| Seção | O que faz |
|---|---|
| **Intro** | Splash com logo e abertura em cortina |
| **Header** | Nav sticky com blur reativo ao scroll + menu mobile |
| **Hero** | MURILO / ORIGINAL'S / BURGER em gradiente de chama, com CTA e números da casa |
| **Marquee** | Faixa contínua com os argumentos da marca |
| **Burgers** | Carrossel dos produtos — scroll horizontal no mobile, GSAP no desktop |
| **Modal** | Foto e ingredientes do burger, com stagger na entrada |
| **Como pedir** | O caminho até o pedido, em passos |
| **Avaliações** | Prova social de clientes reais |
| **Galeria** | Feed visual no estilo Instagram |
| **CTA + Footer** | Chamada final, contato e WhatsApp flutuante |

---

## 🛠️ Stack

<table>
  <tbody>
    <tr>
      <td><strong>Framework</strong></td>
      <td><img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white"/> (App Router) <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/></td>
    </tr>
    <tr>
      <td><strong>Estilo</strong></td>
      <td><img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat-square"/> <img src="https://img.shields.io/badge/Lucide-222222?style=flat-square"/></td>
    </tr>
    <tr>
      <td><strong>Animações</strong></td>
      <td><img src="https://img.shields.io/badge/GSAP_3-88CE02?style=flat-square&logo=greensock&logoColor=black"/> — ScrollTrigger, pin, stagger, scramble</td>
    </tr>
    <tr>
      <td><strong>Tipografia</strong></td>
      <td><img src="https://img.shields.io/badge/Bebas_Neue-F0EAE0?style=flat-square&logoColor=black"/> display · <img src="https://img.shields.io/badge/DM_Sans-7A7180?style=flat-square"/> corpo — via <code>next/font</code></td>
    </tr>
    <tr>
      <td><strong>Deploy</strong></td>
      <td><img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/> — auto-deploy a cada push em <code>main</code></td>
    </tr>
  </tbody>
</table>

---

## 🎨 Paleta

```css
--mob-black:   #08070B   /* fundo — a comida é a única luz */
--mob-surface: #100E17
--mob-card:    #17141F
--mob-fire:    #FF4500   /* CTA e destaques */
--mob-amber:   #FFB000
--mob-text:    #F0EAE0
--mob-muted:   #7A7180
```

---

## 🚀 Rodando localmente

### Pré-requisitos

| Requisito | Versão | De onde vem |
|---|---|---|
| **Node.js** | `>= 20.9.0` | piso declarado pelo `next@16.2.6` (campo `engines`) — o `eslint@9` pede `^18.18 \|\| ^20.9 \|\| >=21.1`, então **20.9+ satisfaz os dois** |
| **npm** | o que acompanha o Node | `package-lock.json` é lockfile v3 |

Só isso. Sem banco, sem Docker, sem conta em serviço externo — a landing não fala com backend nenhum: os CTAs abrem `wa.me` e Instagram direto no navegador.

> O repo não fixa versão (`.nvmrc` e `engines` não existem aqui), então o piso acima é o do próprio Next. Qualquer Node 20.9+ / 22 LTS serve.

### Passo a passo

```bash
# 1. clone e entre no projeto
git clone https://github.com/mateus-vitor-ferreira-dev/mob-burger-landing.git
cd mob-burger-landing

# 2. confira o Node (precisa ser >= 20.9.0)
node -v

# 3. instale as dependências
npm install          # ou `npm ci` para respeitar o lockfile à risca

# 4. suba o dev server
npm run dev          # http://localhost:3000
```

Não há passo 5. Sem migration, sem seed, sem `.env` para preencher — o `npm run dev` já entrega a landing pronta.

### Variáveis de ambiente

**A landing não depende de variáveis de ambiente.** Não existe `.env.example` no repo porque não há o que exemplificar: nenhum `process.env.*` nem `NEXT_PUBLIC_*` é lido em `src/`. Telefone do WhatsApp, handle do Instagram e cardápio são valores literais no código.

> Se um dia alguma entrar: `.env*` já está no `.gitignore`. Nunca commite.

### Endpoints locais

| O quê | URL |
|---|---|
| Landing | `http://localhost:3000` |
| Cardápio completo (HTML estático em `public/`, abre em nova aba pelo botão **Ver Cardápio** do hero) | `http://localhost:3000/cardapio.html` |

Porta padrão do `next dev` — o script não passa `-p`.

### Como verificar que subiu

Abra `http://localhost:3000`. A ordem correta é: **splash com o logo abrindo em cortina** → hero com **MURILO / ORIGINAL'S / BURGER** em gradiente de chama → cursor customizado seguindo o mouse. Role até o carrossel: clicar num burger abre o modal com foto e ingredientes.

Se o hero aparecer sem o gradiente ou com fonte serifada de fallback, as fontes não carregaram — veja abaixo.

### Problemas comuns

**Build/dev falhando ou fonte errada sem internet.** `next/font/google` baixa Bebas Neue e DM Sans **em tempo de build**, não no navegador do visitante. Primeira execução atrás de proxy restritivo ou offline quebra o build ou cai no fallback do sistema. Depois de baixado, fica em cache — e em produção nenhuma request vai para o Google.

**Porta 3000 ocupada.** Comum se o web app do projeto já estiver rodando:

```bash
npm run dev -- -p 3001
```

### Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Dev server com hot-reload em `http://localhost:3000` |
| `npm run build` | Build de produção |
| `npm start` | Serve o build de produção em `http://localhost:3000` — exige um `npm run build` antes |
| `npm run lint` | ESLint com `core-web-vitals` + regras de TypeScript do `eslint-config-next` |

Não há script de testes nem de typecheck neste repo — a checagem de tipos acontece no `build`.

---

<div align="center">
  <sub>Desenvolvido pela <strong>Codexa</strong> · <a href="https://github.com/mateus-vitor-ferreira-dev/mob-burger-web">Web app do projeto</a></sub>
</div>
