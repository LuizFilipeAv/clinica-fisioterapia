import hero from '../assets/images/hero.webp'
import recepcao from '../assets/images/clinica-recepcao.webp'
import sala from '../assets/images/clinica-sala.webp'
import ginasio from '../assets/images/clinica-ginasio.webp'
import maos from '../assets/images/clinica-maos.webp'
import avaliacao from '../assets/images/etapa-avaliacao.webp'
import equipe1 from '../assets/images/equipe-1.webp'
import equipe2 from '../assets/images/equipe-2.webp'
import equipe3 from '../assets/images/equipe-3.webp'
import equipe4 from '../assets/images/equipe-4.webp'
import fachada from '../assets/images/fachada.webp'

export const clinic = {
  name: 'Áurea',
  fullName: 'Áurea Fisioterapia',
  tagline: 'Fisioterapia, osteopatia e pilates clínico',
  phone: '(11) 3456-7890',
  phoneHref: 'tel:+551134567890',
  whatsapp: '(11) 98765-4321',
  whatsappHref: 'https://wa.me/5511987654321',
  email: 'contato@aureafisio.com.br',
  address: 'Rua das Acácias, 214 · Vila Madalena',
  city: 'São Paulo · SP · 05435-010',
  mapsHref: 'https://maps.google.com/?q=Vila+Madalena+São+Paulo',
  hours: [
    { days: 'Segunda a sexta', time: '7h às 20h' },
    { days: 'Sábado', time: '8h às 13h' },
  ],
}

export const sections = [
  { id: 'inicio', label: 'Início' },
  { id: 'especialidades', label: 'Especialidades' },
  { id: 'clinica', label: 'A clínica' },
  { id: 'tratamentos', label: 'Tratamentos' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'contato', label: 'Contato' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const heroContent = {
  image: hero,
  imageAlt: 'Fisioterapeuta orientando um paciente em um alongamento lateral sobre o tapete',
  title: 'Saúde em boas mãos',
  lead: 'Avaliação cuidadosa e um plano feito para o seu corpo. Tratamos a causa da dor, não só o sintoma, para você voltar a se mover com confiança.',
  pillars: [
    {
      title: 'Fisioterapia',
      text: 'Prevenção e recuperação de lesões, dores e limitações de movimento, com exercícios e técnicas guiadas por evidência.',
    },
    {
      title: 'Osteopatia',
      text: 'Abordagem manual e global que restaura a mobilidade do corpo e estimula a capacidade natural de se reequilibrar.',
    },
  ],
}

export const specialties = [
  { title: 'Coluna', text: 'Lombalgia, cervicalgia, hérnia de disco, escoliose e travamentos.' },
  { title: 'Pós-operatório', text: 'Reabilitação após cirurgias de joelho, quadril, ombro e coluna.' },
  { title: 'Esportiva', text: 'Entorses, tendinites, lesões musculares e retorno seguro ao esporte.' },
  { title: 'Dor crônica', text: 'Fibromialgia, dores persistentes e cefaleia tensional.' },
  { title: 'ATM', text: 'Dor na mandíbula, estalos, bruxismo e tensão facial.' },
  { title: 'Ortopedia', text: 'Artrose, bursite, fascite plantar e alterações posturais.' },
  { title: 'Neurológica', text: 'AVC, Parkinson e reeducação do equilíbrio e da marcha.' },
  { title: 'Gestantes', text: 'Alívio de dores na gestação e recuperação pós-parto.' },
]

export const gallery = {
  title: 'Um espaço pensado para o seu movimento',
  marquee: 'Luz natural · Silêncio · Cuidado',
  images: [
    { src: recepcao, alt: 'Recepção clara com poltronas azuis e balcão branco com detalhes dourados' },
    { src: sala, alt: 'Sala de atendimento com maca, espaldar de madeira e bola de exercício' },
    { src: ginasio, alt: 'Estúdio de pilates com aparelhos reformer e janelas amplas' },
    { src: maos, alt: 'Fisioterapeuta realizando terapia manual no ombro de um paciente' },
  ],
}

export const treatments = {
  title: 'Tratamentos',
  intro: 'Combinamos técnicas para cada fase da recuperação. Você não escolhe sozinho: a avaliação indica o caminho.',
  image: maos,
  imageAlt: 'Mãos de fisioterapeuta aplicando terapia manual nas costas de um paciente',
  items: [
    {
      title: 'Fisioterapia ortopédica',
      text: 'Exercícios terapêuticos, recursos manuais e eletrotermofototerapia para recuperar força e amplitude.',
    },
    {
      title: 'Osteopatia',
      text: 'Técnicas manuais suaves que liberam articulações, músculos e vísceras para o corpo voltar a funcionar em conjunto.',
    },
    {
      title: 'Terapia manual',
      text: 'Mobilizações e liberação miofascial para aliviar a dor e destravar movimentos limitados.',
    },
    {
      title: 'Pilates clínico',
      text: 'Fortalecimento e controle motor em aparelhos, com turmas de até três pessoas e acompanhamento do fisioterapeuta.',
    },
  ],
}

export const process = {
  title: 'Como funciona',
  intro: 'Do primeiro contato à alta, você sabe exatamente onde está e o que vem a seguir.',
  image: avaliacao,
  imageAlt: 'Fisioterapeuta explicando um modelo de coluna vertebral a um paciente durante a avaliação',
  ring: 'avaliação · plano · tratamento · alta · ',
  steps: [
    { title: 'Avaliação', text: 'Conversa detalhada, testes de movimento e análise dos seus exames.' },
    { title: 'Plano', text: 'Definimos juntos o objetivo e o número estimado de sessões.' },
    { title: 'Tratamento', text: 'Sessões individuais de 50 minutos, com evolução registrada a cada encontro.' },
    { title: 'Alta', text: 'Você sai com um programa de exercícios para manter o resultado em casa.' },
  ],
}

export const team = {
  title: 'Equipe',
  intro: 'Quatro especialistas, um mesmo cuidado.',
  members: [
    {
      name: 'Dra. Helena Duarte',
      role: 'Fisioterapeuta · Diretora clínica',
      focus: 'Coluna e dor crônica',
      credential: 'CREFITO-3 112233-F',
      image: equipe1,
    },
    {
      name: 'Rafael Moura',
      role: 'Fisioterapeuta esportivo',
      focus: 'Lesões esportivas e pós-operatório',
      credential: 'CREFITO-3 223344-F',
      image: equipe2,
    },
    {
      name: 'Dra. Marta Siqueira',
      role: 'Osteopata · Fisioterapeuta',
      focus: 'Osteopatia e ATM',
      credential: 'CREFITO-3 334455-F',
      image: equipe3,
    },
    {
      name: 'Lucas Ferraz',
      role: 'Fisioterapeuta · Pilates clínico',
      focus: 'Pilates e reeducação postural',
      credential: 'CREFITO-3 445566-F',
      image: equipe4,
    },
  ],
}

export const contact = {
  title: 'Venha nos visitar',
  marquee: 'Vila Madalena · São Paulo',
  image: fachada,
  imageAlt: 'Fachada branca da clínica com toldo azul-claro e portas de vidro com moldura dourada',
  cta: 'Agendar avaliação',
}
