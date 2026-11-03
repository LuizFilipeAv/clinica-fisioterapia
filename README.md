# Áurea Fisioterapia

Projeto fictício para portfólio: landing page de uma clínica de fisioterapia em React + Vite + TypeScript, com foco em motion design.

## Destaques de motion

- **Preloader:** linhas douradas desenham na horizontal, a saudação "Bem-vindo à Áurea" sobe letra por letra e a cortina sai para cima.
- **Rolagem suave:** Lenis sincronizado com o ticker do GSAP e com o ScrollTrigger.
- **Hero:** a frase "Saúde em boas mãos" desliza na horizontal conforme o scroll, a foto faz parallax e o texto de apresentação acende palavra por palavra.
- **Títulos:** cada título sobe letra por letra ao entrar na tela.
- **Especialidades:** no desktop, a seção fica fixada e os cards avançam na horizontal conforme o scroll.
- **Imagens:** as fotos são reveladas por máscara (clip-path) de baixo para cima, com parallax interno.
- **Tratamentos:** os painéis derivam em velocidades diferentes ao rolar (desktop).
- **Como funciona:** seção fixada com um círculo dourado que cresce, anel de texto girando, anel de progresso dirigido pelo scroll e troca das etapas 01 a 04.
- **Faixas de texto:** frases gigantes que deslizam com o scroll na galeria, no contato e na seção Como funciona.
- **Rótulo de seção:** barra fixa com o nome da seção e contador, como "02 / 07".
- **Menu:** gaveta lateral que desliza sobre a página, com a seção atual destacada.

Todas as animações respeitam `prefers-reduced-motion`: com a preferência ativa, a rolagem suave não inicia, o preloader é pulado e o layout fica estático. Abaixo de 900px, a fixação horizontal das especialidades é desativada e a lista vira vertical, e os efeitos de deriva dos tratamentos ficam só no desktop.

## Stack

- React 19
- Vite 8
- TypeScript
- GSAP 3, com ScrollTrigger e @gsap/react
- Lenis
- CSS puro, com tokens de design (sem framework de UI)

## Paleta

- Dourado `#C9A24B`
- Azul claro `#BFDDF0` (apoio `#E8F3FA`)
- Branco `#FFFFFF`
- Texto grafite `#1E2A33`

O texto dourado usa um tom mais escuro, `#85651C`, para garantir contraste sobre fundo branco.

## Estrutura

```text
src/
├── App.tsx              # composição da página, preloader e atualização dos ScrollTriggers
├── main.tsx             # ponto de entrada da aplicação
├── components/          # blocos reutilizáveis (Preloader, Header, SplitText, RevealImage, Marquee...)
├── sections/            # uma seção por arquivo (Hero, Specialties, Gallery, Treatments, Process...)
├── lib/                 # motion.ts (GSAP, easing e durações), smoothScroll.ts (Lenis), layout.ts
├── data/
│   └── content.ts       # textos, dados da clínica e imagens usadas em cada seção
├── styles/
│   └── global.css       # tokens de cor, tipografia e breakpoints
└── assets/
    └── images/          # fotos em .webp
```

Cada componente e seção tem seu CSS ao lado do arquivo `.tsx`.

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

## Créditos

Imagens geradas por IA. A clínica, os nomes, os endereços e os telefones são fictícios.
