# Áurea Fisioterapia

Projeto fictício para portfólio: landing page de uma clínica de fisioterapia em React + Vite + TypeScript, com foco em motion design e formas orgânicas.

## Destaques de motion

As seções são "folhas" arredondadas que se sobrepõem ao rolar. A rolagem suave do Lenis está sincronizada com o ticker do GSAP e com o ScrollTrigger.

- **Abertura:** um anel dourado se desenha, a saudação "Bem-vindo à Áurea" sobe letra por letra e a cortina de borda curva se recolhe para cima.
- **Header:** pílula flutuante que se esconde ao descer a página e volta a qualquer rolagem para cima. Um marcador desliza sob a seção atual. No mobile, o menu abre como um círculo que cresce a partir do botão.
- **Hero:** a foto em arco se abre em retângulo arredondado conforme a seção sai da tela. Formas flutuantes têm parallax de rolagem e, em dispositivos com mouse, também seguem o ponteiro. "Saúde em boas mãos" atravessa a tela em letras gigantes, e o texto de apresentação acende palavra por palavra.
- **Especialidades:** no desktop (a partir de 900px), a seção fica fixada e a rolagem vertical move os cards na horizontal. Cada card balança ao cruzar a tela, e uma barra de progresso acompanha o percurso.
- **Galeria:** fotos em arco com parallax em velocidades diferentes e duas fitas de texto cruzadas, uma dourada e uma azul, que deslizam com a rolagem.
- **Tratamentos:** cards empilhados que grudam no topo. Enquanto o próximo card sobe por cima, o de baixo afunda, inclina e escurece.
- **Como funciona:** seção fixada em que um círculo dourado cresce, um anel de texto gira, um anel de progresso acompanha a rolagem e as quatro etapas se revezam.
- **Equipe:** cards que sobem ao entrar na tela e se elevam ao passar o mouse, com a foto ampliada e um anel dourado.
- **Contato:** botão de agendamento magnético, que acompanha levemente o ponteiro.
- **Títulos e fotos:** os títulos sobem letra por letra, e as fotos são reveladas por máscara de baixo para cima.

Todas as animações respeitam `prefers-reduced-motion`: com a preferência ativa, a rolagem suave não é iniciada, o preloader é pulado e o layout fica estático. No mobile, abaixo de 900px, as especialidades viram um carrossel de arrastar, e a galeria faz o mesmo abaixo de 640px.

## Stack

- React 19
- Vite 8
- TypeScript
- GSAP 3, com ScrollTrigger e @gsap/react
- Lenis, para rolagem suave
- CSS puro, com design tokens (sem framework de UI)
- Fontes Instrument Serif (títulos) e Inter Tight (texto), via Google Fonts

## Paleta

Os tokens ficam em `src/styles/global.css`.

| Token | Valor | Uso |
| --- | --- | --- |
| `--blue-50` | `#F3F9FD` | fundo da página |
| `--blue-100` | `#E3F0F9` | superfícies suaves |
| `--blue-200` | `#BFDDF0` | base de seções claras |
| `--blue-300` | `#9CCBE8` | formas de apoio |
| `--blue-700` | `#2B5874` | texto sobre azul claro |
| `--blue-900` | `#12344A` | seções escuras e títulos |
| `--gold` | `#C9A24B` | destaques, botões e anéis |
| `--gold-soft` | `#F1E3BE` | fundos dourados suaves |
| `--gold-ink` | `#85651C` | texto dourado sobre branco |
| `--white` | `#FFFFFF` | cards e textos sobre fundo escuro |
| `--ink` | `#1E2A33` | texto grafite principal |
| `--ink-soft` | `#4B5A66` | texto secundário |

O texto dourado usa `#85651C` em vez do dourado base para garantir contraste sobre fundo branco.

## Estrutura

```text
src/
├── App.tsx              # composição da página, preloader e atualização dos ScrollTriggers
├── main.tsx             # ponto de entrada da aplicação
├── components/          # Preloader, Header, Logo, SplitText, RevealHeading, RevealImage, Marquee
├── sections/            # Hero, Specialties, Gallery, Treatments, Process, Team, Contact, Footer
├── lib/
│   ├── motion.ts        # registro do GSAP e do ScrollTrigger, easing e durações compartilhados
│   └── smoothScroll.ts  # Lenis, rolagem até uma seção e bloqueio da rolagem
├── data/
│   └── content.ts       # textos, dados da clínica, equipe e imagens de cada seção
├── styles/
│   └── global.css       # tokens de cor, tipografia, raios e curvas, base das seções e botões
└── assets/
    └── images/          # fotos em .webp
```

Seções e componentes com estilo próprio têm o `.css` ao lado do arquivo `.tsx`.

## Branches

- `front-inicial`: primeira versão, com grid editorial inspirado no site de referência.
- `front-v2`: versão final, mais orgânica, com seções em folhas, cards e formas arredondadas.

## Rodando localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Gere a build de produção (checagem de tipos com `tsc` seguida do `vite build`):

```bash
npm run build
```

Visualize a build gerada:

```bash
npm run preview
```

## Créditos

Imagens geradas por IA. A clínica, os nomes, os registros profissionais, os endereços e os telefones são fictícios.
