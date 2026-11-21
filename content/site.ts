// Todo o texto do site fica aqui (e em tanques.ts / empresa.ts).
// Para editar, troque o texto entre aspas. Não mexa nas chaves (nomes à esquerda).
// Itens marcados com [CONFIRMAR] ou [LINK] dependem de informação do cliente.

export const contato = {
  empresa: "Tanques Alfa",
  razaoSocial: "ALFA Equipamentos Rodoviários Eireli ME",
  cnpj: "[CONFIRMAR]",
  endereco: "Rua Marginal Via Anhanguera, Km 134, nº 7498",
  cidade: "Limeira/SP",
  cep: "13487-506",
  telefone: "(19) 4103-9879",
  telefoneHref: "tel:+551941039879",
  whatsapp: "(19) 98150-6868",
  whatsappNumero: "5519981506868",
  email: "contato@tanquesalfa.com.br",
  horario: "Segunda a sexta, das 8h às 17h30",
  mapaEmbed:
    "https://www.google.com/maps?q=Rua+Marginal+Via+Anhanguera+Km+134+7498+Limeira+SP+13487-506&output=embed",
  redes: {
    facebook: "[LINK]",
    instagram: "[LINK]",
    youtube: "[LINK]",
  },
};

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${contato.whatsappNumero}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;

export const nav = [
  { label: "Início", href: "/" },
  { label: "Tanques", href: "/#tanques" },
  { label: "A Fábrica", href: "/empresa/" },
  { label: "Normas", href: "/empresa/#normas" },
  { label: "Galeria", href: "/galeria/" },
  { label: "Contato", href: "/contato/" },
];

// HERO (céu + tanque real suspenso pela ponte rolante)
export const heroCeu = {
  palavra: "ALFA",
  lateral: "Fabricado em Limeira-SP · Certificado INMETRO",
  titulo: "Do primeiro litro ao último quilômetro.",
  texto: "Tanques rodoviários e estacionários em aço carbono, projetados sob medida para água, combustível, saneamento e uso agrícola.",
  cta: "Pedir orçamento",
  fabrica: "Veja a fábrica em ação",
  provaNumero: "INMETRO",
  provaTexto: "Certificada desde 2018 para produtos perigosos",
  explorar: "Explore por tipo de tanque",
};

export const hero = {
  linha1: "Do primeiro litro",
  linha2: "ao último",
  linha3: "quilômetro.",
  // Alternativa para teste A/B: "Da primeira solda" / "ao último" / "quilômetro."
  rodape1: "Fabricado em Limeira.",
  rodape2: "Certificado INMETRO.",
  selo: "Quero o meu",
  seloAnel: "SOLICITE SEU ORÇAMENTO • TANQUES SOB MEDIDA • ",
  resumo:
    "Tanques rodoviários e estacionários para água, combustível, saneamento e uso agrícola, projetados e fabricados sob medida em aço carbono.",
};

export const fabrica = {
  label: "Fabricação própria",
  nossos: "Nossos tanques",
  titulo1: "Tudo que o seu líquido precisa.",
  titulo2: "Em um só fabricante.",
  paragrafo:
    "Do cálculo estrutural à última demão de tinta, cada etapa acontece dentro da nossa fábrica em Limeira. Isso significa prazo sob controle, qualidade conferida de perto e um único responsável pelo seu equipamento.",
  estradaTitulo1: "Segurança em",
  estradaTitulo2: "cada quilômetro",
  diferenciais: [
    {
      titulo: "Certificação INMETRO",
      texto: "Habilitada desde 2018 para fabricar tanques de carga para produtos perigosos (Portaria nº 16/2016).",
    },
    {
      titulo: "Projeto sob medida",
      texto: "Estudos, cálculos e desenhos feitos para o seu chassi, o seu produto e a sua operação.",
    },
    {
      titulo: "Montagem e manutenção",
      texto: "Instalamos no caminhão e cuidamos do equipamento ao longo de toda a vida útil.",
    },
    {
      titulo: "Atendimento direto da fábrica",
      texto: "Você conversa com quem projeta e fabrica, sem intermediários.",
    },
  ],
  beneficios: [
    { titulo: "Qualidade preservada", texto: "Tanques que protegem o produto do carregamento à descarga." },
    { titulo: "Normas atendidas", texto: "Fabricação dentro das exigências do INMETRO." },
    { titulo: "Chapa e solda certificadas", texto: "Equipe qualificada em solda, cálculo e desenho." },
    { titulo: "Entrega no prazo", texto: "Planejamento de produção com compromisso de data." },
  ],
  fechamento: "Tanques que trabalham tão duro quanto você.",
};

// "animar: true" faz o número contar no scroll. Códigos de registro ficam estáticos.
export const numeros = [
  { valor: 2018, texto: "", animar: true, legenda: "Ano da certificação INMETRO para produtos perigosos" },
  { valor: 5, texto: "", animar: true, legenda: "Linhas de tanques: água, combustível, estacionário, saneamento e agrícola" },
  { valor: 0, texto: "OCP 0135", animar: false, legenda: "Organismo de certificação responsável pela avaliação" },
  { valor: 0, texto: "16/2016", animar: false, legenda: "Portaria INMETRO que a Alfa atende na fabricação" },
];

export const normas = {
  titulo: "Normas & qualidade",
  texto: [
    "Desde 2018 a Alfa atende aos requisitos da certificação compulsória para Tanques de Carga Rodoviários Destinados ao Transporte de Produtos Perigosos, conforme a Portaria INMETRO nº 16, de 14/01/2016.",
    "O registro nº 002462/2019 foi concedido após avaliação do OCP 0135. Na prática, cada tanque sai da fábrica com rastreabilidade de materiais, soldas inspecionadas e documentação técnica completa.",
  ],
  registro: "Registro INMETRO nº 002462/2019 · OCP 0135",
};

export const clientes = {
  titulo: "Quem confia na Alfa",
  texto: "Empresas de logística, saneamento, água e combustível que rodam com equipamentos Alfa.",
  logos: [
    { nome: "Porto Sudeste", src: "/img/clientes/portosudeste.png" },
    { nome: "Engep", src: "/img/clientes/engep.jpg" },
    { nome: "Barueri", src: "/img/clientes/barueri.jpg" },
    { nome: "Água Jato", src: "/img/clientes/aguajato.jpg" },
    { nome: "Lubrinatti", src: "/img/clientes/lubrinatti.png" },
  ],
};

export const atendimento = [
  {
    titulo: "Projetos personalizados",
    texto: "Conte o que você transporta, o chassi e a operação. A gente desenha o tanque certo, com compartimentos, bocais e acessórios definidos para o seu caso.",
    imagem: "/img/fotos/combustivel02.webp",
    cta: "Começar um projeto",
    href: "/contato/?assunto=projeto",
  },
  {
    titulo: "Pós-venda e manutenção",
    texto: "Revisões, reparos, adequações e reformas de tanques. Mantemos seu equipamento rodando com segurança e dentro das normas.",
    imagem: "/img/fotos/tanques_combustivel4.webp",
    cta: "Agendar manutenção",
    href: "/contato/?assunto=manutencao",
  },
  {
    titulo: "Informações técnicas",
    texto: "Catálogos, fichas técnicas e orientações sobre certificação. Peça o material da linha que você precisa.",
    imagem: "/img/fotos/tanques_agua5.webp",
    cta: "Pedir catálogo",
    href: "/contato/?assunto=catalogo",
  },
];

export const ctaFinal = {
  titulo1: "Bora fabricar",
  titulo2: "o seu tanque?",
  texto: "Preencha os dados abaixo e a mensagem já sai pronta no WhatsApp da fábrica. Respondemos em horário comercial.",
};
