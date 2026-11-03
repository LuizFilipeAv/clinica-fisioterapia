# Áurea Fisioterapia — Briefing

**Nome:** Áurea Fisioterapia · *Movimento que cura*
**Stack:** React + Vite + TypeScript
**Paleta:** Dourado `#C9A24B` · Azul claro `#BFDDF0` (apoio `#E8F3FA`) · Branco `#FFFFFF` · Texto grafite `#1E2A33`

## Seções (6)
| # | Seção | Conteúdo |
|---|-------|----------|
| 01 | Início | Hero com foto grande + frase gigante deslizando |
| 02 | Especialidades | 8 cards (coluna, pós-operatório, esportiva, dor crônica, ATM, ortopedia, neurológica, pilates clínico) |
| 03 | A clínica | Galeria de 4 fotos |
| 04 | Tratamentos | 4 cards (Fisioterapia, Osteopatia, Terapia manual, Pilates clínico) |
| 05 | Como funciona | 4 etapas (avaliação → plano → tratamento → alta) |
| 06 | Equipe | 4 profissionais |
| 07 | Contato | Endereço, mapa, horário, rodapé |

## Motion mapeado do site de referência (versão moderada)
| Efeito do original | Como vamos fazer |
|---|---|
| Preloader: linhas horizontais desenham + "Bem-vindo à Áurea" | Linhas douradas desenham, texto sobe, cortina sai pra cima (~1.6s) |
| Rolagem suave (SmoothScroll) | Lenis |
| Texto gigante sobre o hero desliza na horizontal conforme o scroll | Frase "Saúde em boas mãos" atrelada ao scroll (GSAP ScrollTrigger) |
| Barra fixa por seção "Nome · 01/08" que empilha | Label sticky com contador "02 / 07" em dourado |
| Títulos letra a letra subindo (anime.js, 40ms stagger, easeOutExpo) | SplitText caseiro + stagger 30ms, easeOutExpo |
| Cards de especialidades rolam na horizontal (seção fixada) | Pin + scroll horizontal no desktop; lista vertical no mobile |
| Galeria: fotos sobem com stagger + texto gigante | Fotos com reveal de máscara (clip-path) |
| Tratamentos: cards entram espalhados sobre fundo colorido | Fundo azul claro, cards sobem em cascata com leve parallax |
| Como funciona: círculos que crescem, texto circular girando, troca de etapa no scroll | Círculo dourado cresce, anel com texto girando, etapa 01→04 troca no scroll |
| Hover nos cards da equipe escurece o fundo | Hover: fundo azul claro preenche de baixo pra cima, foto dá leve zoom |
| Menu lateral empurra a página, item ativo com fundo cheio | Drawer lateral, itens com preenchimento dourado no hover |
| Barra lateral fixa com logo vertical + hambúrguer | Mantém, versão compacta no mobile |

Tudo respeita `prefers-reduced-motion`.
