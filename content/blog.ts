// Blog "Novidades e artigos": conteúdo técnico e educativo sobre tanques.
// Para publicar um novo artigo, adicione um item no topo da lista (a data define a ordem).
export type Bloco = { h2?: string; p?: string; lista?: string[] };
export type Post = {
  slug: string;
  titulo: string;
  data: string; // AAAA-MM-DD
  categoria: string;
  tags?: string[];
  subtitulo?: string;
  resumo: string;
  capa: string;
  capaAlt: string;
  corpo: Bloco[];
};

export const posts: Post[] = [
  {
    slug: "alfa-certificada-inmetro-produtos-perigosos",
    titulo: "Alfa: fabricação certificada pelo INMETRO para produtos perigosos",
    subtitulo: "Desde 2018, os tanques de carga da Alfa são produzidos dentro da certificação compulsória do INMETRO",
    data: "2026-11-20",
    categoria: "Notícias Alfa",
    tags: ["Notícias Alfa", "INMETRO", "Produtos perigosos"],
    resumo: "Registro nº 002462/2019, certificado pelo OCP 0135: o que essa certificação garante para quem compra um tanque de combustível Alfa.",
    capa: "/img/fotos/combustivel06.webp",
    capaAlt: "Caminhão-tanque de combustível da Alfa no pátio da fábrica",
    corpo: [
      { p: "Em 2018, a Alfa Equipamentos Rodoviários passou a atender aos requisitos para a produção de Tanques de Carga Rodoviários Destinados ao Transporte de Produtos Perigosos, conforme a certificação compulsória do INMETRO." },
      { p: "O registro nº 002462/2019 foi concedido com certificação do OCP 0135, organismo responsável pela avaliação. Na prática, isso significa que o processo de fabricação da Alfa é avaliado: projeto, materiais, soldagem, ensaios e identificação do tanque." },
      { h2: "O que isso muda para o cliente", lista: ["Segurança: equipamento fabricado dentro das exigências para transporte de combustíveis", "Regularidade: tanque com documentação e identificação exigidas pela fiscalização", "Confiança: fabricante avaliado por organismo de certificação"] },
      { h2: "Atualização constante", p: "A equipe segue em busca constante de atualização e aperfeiçoamento para manter o padrão de qualidade dos serviços, acompanhando as revisões da regulamentação." },
      { p: "Quer saber se o seu projeto se enquadra como produto perigoso? Fale com a nossa equipe técnica." },
    ],
  },
  {
    slug: "checklist-antes-de-pedir-orcamento",
    titulo: "Checklist: o que ter em mãos antes de pedir o orçamento do seu tanque",
    subtitulo: "Seis informações que deixam o orçamento mais rápido e o projeto mais preciso",
    data: "2026-11-12",
    categoria: "Dicas",
    tags: ["Dicas", "Orçamento", "Projeto"],
    resumo: "Produto, volume, chassi, descarga, acessórios e prazo: com essas respostas, a equipe de projeto chega ao equipamento certo já na primeira conversa.",
    capa: "/img/fotos/tanques_agua3.webp",
    capaAlt: "Tanque de água fabricado pela Alfa",
    corpo: [
      { p: "Um orçamento bem feito começa com boas informações. Quanto mais clara a operação, mais preciso é o projeto e menor a chance de ajustes depois da entrega." },
      { h2: "Separe estas informações", lista: ["Produto: o que vai ser transportado ou armazenado (água potável, água bruta, diesel, efluente, insumo agrícola)", "Volume: capacidade desejada e se precisa de compartimentos", "Chassi: marca, modelo, ano e entre-eixos; se ainda não tiver o caminhão, dizemos o que ele precisa ter", "Descarga: gravidade, bomba, vácuo, canhão, barra de aspersão ou medidor", "Acessórios: escada, passarela, guarda-corpo, caixa de ferramentas, carretel de mangueira", "Prazo: quando o equipamento precisa estar rodando"] },
      { h2: "Dica de ouro", p: "Se possível, envie fotos do chassi e do local onde o caminhão vai operar. Isso ajuda a prever acesso, altura de carregamento e espaço para manobra." },
      { p: "Com essas respostas, o orçamento pode ser feito já pelo WhatsApp, direto com quem projeta e fabrica." },
    ],
  },
  {
    slug: "manutencao-preventiva-do-tanque",
    titulo: "Manutenção preventiva: 7 cuidados que aumentam a vida útil do tanque",
    subtitulo: "Rotinas simples que evitam vazamentos, corrosão e caminhão parado",
    data: "2026-11-08",
    categoria: "Dicas",
    tags: ["Dicas", "Manutenção", "Vida útil"],
    resumo: "Inspeção visual, vedações, fixação no chassi e pintura: um roteiro prático para o dia a dia da frota.",
    capa: "/img/fotos/combustivel09.webp",
    capaAlt: "Detalhe de tanque de combustível com válvulas e escada",
    corpo: [
      { p: "Um tanque bem fabricado dura muitos anos, desde que receba cuidados básicos. A maior parte dos problemas começa pequena e é fácil de corrigir quando percebida cedo." },
      { h2: "O roteiro", lista: ["Inspeção visual semanal: procure manchas, umidade e sinais de vazamento em soldas, válvulas e conexões", "Vedações: troque juntas e anéis de vedação ressecados antes que comecem a vazar", "Fixação no chassi: confira parafusos, grampos e apoios; folgas aumentam o esforço sobre a estrutura", "Pintura: retoque riscos e batidas para impedir que a corrosão avance", "Válvulas: acione periodicamente as válvulas pouco usadas para evitar travamento", "Limpeza interna: siga a frequência adequada ao produto transportado", "Documentação: mantenha em dia as inspeções obrigatórias, quando aplicáveis"] },
      { h2: "Quando chamar o fabricante", p: "Trincas, deformações, vazamentos em solda e danos após acidentes devem ser avaliados por quem conhece o projeto. Reparos improvisados podem comprometer a segurança e a certificação do equipamento." },
      { p: "A Alfa faz manutenção e adequação dos tanques que fabrica ao longo de toda a vida útil." },
    ],
  },
  {
    slug: "como-escolher-o-tanque-certo",
    tags: ["Dicas", "Projeto"],
    titulo: "Como escolher o tanque certo para a sua operação",
    data: "2026-11-18",
    categoria: "Guia",
    resumo: "Produto transportado, chassi, forma de descarga e rotina de uso: os pontos que definem um bom projeto de tanque antes do primeiro corte de chapa.",
    capa: "/img/fotos/combustivel04.webp",
    capaAlt: "Caminhão-tanque de combustível fabricado pela Alfa",
    corpo: [
      { p: "Um tanque bem projetado começa por perguntas, não por desenho. O mesmo chassi pode receber equipamentos muito diferentes, e a escolha certa depende de como o caminhão vai trabalhar no dia a dia." },
      { h2: "1. O que vai ser transportado", p: "Água potável, água bruta, combustível, efluente ou insumo agrícola: cada produto muda o material, o acabamento interno, os acessórios e as exigências legais. Combustíveis entram na regulamentação de produtos perigosos; água para consumo humano tem norma própria; efluentes pedem um tanque preparado para trabalhar sob vácuo." },
      { h2: "2. O chassi", p: "Capacidade de carga, entre-eixos e distribuição de peso definem o volume máximo e o formato do tanque. O equipamento precisa apoiar corretamente sobre as longarinas e respeitar os limites de peso por eixo, para não sobrecarregar o caminhão nem gerar multa na balança." },
      { h2: "3. Como o produto sai do tanque", p: "Descarga por gravidade, por bomba, por vácuo, com canhão, barra de aspersão ou medidor: a forma de descarga define tubulação, válvulas e, muitas vezes, a tomada de força do caminhão." },
      { h2: "4. A rotina de uso", lista: ["Estrada asfaltada ou de terra?", "Uma entrega por dia ou várias?", "Um produto ou vários na mesma viagem (compartimentos)?", "Quem opera e com que frequência acessa o topo do tanque?"] },
      { p: "Com essas respostas, a equipe de projeto calcula a estrutura, define os acessórios e apresenta um equipamento que trabalha bem desde o primeiro dia. Na Alfa, essa conversa é feita diretamente com quem projeta e fabrica." },
    ],
  },
  {
    slug: "para-que-servem-os-quebra-ondas",
    tags: ["Técnico", "Segurança"],
    titulo: "Quebra-ondas: o que são e por que fazem diferença na estrada",
    data: "2026-11-04",
    categoria: "Técnico",
    resumo: "Carga líquida se movimenta a cada frenagem e curva. Entenda como as chapas internas do tanque deixam o caminhão mais estável e seguro.",
    capa: "/img/fotos/tanques_combustivel2.webp",
    capaAlt: "Tanque de combustível amarelo visto pela traseira",
    corpo: [
      { p: "Quem dirige caminhão-tanque conhece o efeito: ao frear, o líquido continua andando, bate na frente do tanque e empurra o caminhão. Em curvas, o mesmo acontece para os lados. É o chamado efeito de onda, mais forte quando o tanque não está cheio." },
      { h2: "O que é o quebra-ondas", p: "São chapas instaladas dentro do tanque, transversais ao comprimento, com aberturas que deixam o líquido passar devagar. Elas dividem o volume em partes menores e reduzem a velocidade com que a carga se desloca." },
      { h2: "O que ele resolve", lista: ["Menos empurrão na frenagem e mais previsibilidade para o motorista", "Menor esforço sobre o chassi e sobre a estrutura do próprio tanque", "Mais estabilidade em curvas e em estrada irregular", "Funcionam também como reforço estrutural do corpo do tanque"] },
      { h2: "Quebra-ondas não é compartimento", p: "O compartimento é fechado e separa produtos diferentes; o quebra-ondas tem passagem e só controla o movimento do líquido. Um tanque compartimentado pode ter, além das divisórias, quebra-ondas dentro de cada compartimento." },
      { p: "A quantidade e a posição das chapas fazem parte do cálculo do projeto e dependem do volume, do comprimento do tanque e do produto transportado." },
    ],
  },
  {
    slug: "inspecao-de-tanques-de-produtos-perigosos",
    tags: ["Normas", "Produtos perigosos"],
    titulo: "Tanque para produtos perigosos: certificação e inspeções periódicas",
    data: "2026-10-21",
    categoria: "Normas",
    resumo: "O que muda quando o tanque transporta combustível e outros produtos perigosos, e por que a manutenção em dia evita o caminhão parado.",
    capa: "/img/fotos/combustivel07.webp",
    capaAlt: "Caminhão-tanque azul e amarelo para combustível",
    corpo: [
      { p: "Transportar combustível e outros produtos perigosos exige um equipamento fabricado e mantido dentro de regras específicas. No Brasil, o tanque de carga rodoviário para produtos perigosos passa pela avaliação da conformidade do INMETRO." },
      { h2: "Na fabricação", p: "Os requisitos tratam de projeto, materiais, soldagem, ensaios e identificação do tanque. É por isso que o fabricante precisa ser habilitado: o processo de fabricação é avaliado, e não apenas o produto final. A Alfa é certificada para fabricar tanques de carga para produtos perigosos desde 2018." },
      { h2: "Depois da entrega", p: "O veículo-tanque segue um calendário de inspeções periódicas. Elas verificam a integridade do tanque, das válvulas e dos dispositivos de segurança, e são condição para o equipamento continuar rodando legalmente." },
      { h2: "Como evitar surpresas", lista: ["Guarde a documentação e as placas de identificação do tanque", "Acompanhe a data da próxima inspeção", "Corrija pequenos danos e vazamentos assim que aparecerem", "Faça adequações e reparos com quem conhece o projeto"] },
      { p: "As exigências e os prazos são definidos pela regulamentação vigente do INMETRO. Em caso de dúvida sobre o seu equipamento, fale com a nossa equipe." },
    ],
  },
  {
    slug: "caminhao-pipa-agua-potavel",
    tags: ["Água", "Normas"],
    titulo: "Caminhão-pipa para água potável: o que observar",
    data: "2026-10-07",
    categoria: "Água",
    resumo: "Uso exclusivo, superfície interna adequada e acessórios certos: os cuidados que garantem água de qualidade do carregamento até a entrega.",
    capa: "/img/fotos/agua01.webp",
    capaAlt: "Caminhão-pipa verde fabricado pela Alfa",
    corpo: [
      { p: "Levar água para consumo humano é diferente de levar água para obra ou controle de poeira. Para o transporte de água potável a granel, a referência é a ABNT NBR 16882." },
      { h2: "Uso exclusivo", p: "Um ponto central é que o tanque de água potável não pode ter transportado outro produto. Por isso, um tanque usado em outra aplicação não vira tanque de água potável apenas com limpeza ou com uma nova plaqueta." },
      { h2: "Superfície interna", p: "O interior deve ser liso, fácil de limpar e revestido com material que não altere a qualidade da água. Bocas de visita com acesso adequado facilitam a higienização periódica." },
      { h2: "Acessórios", lista: ["Válvulas e conexões próprias para água potável", "Tampas com vedação para evitar contaminação", "Escada e passarela para inspeção e limpeza com segurança", "Quebra-ondas para estabilidade na estrada"] },
      { p: "Para água bruta e aspersão, o projeto pode incluir bomba acionada pela tomada de força, canhão e barra espargidora. Em ambos os casos, o tanque é dimensionado para o chassi e para a rotina de uso." },
    ],
  },
  {
    slug: "como-funciona-o-tanque-de-saneamento",
    tags: ["Saneamento", "Técnico"],
    titulo: "Como funciona um tanque de saneamento a vácuo",
    data: "2026-09-23",
    categoria: "Saneamento",
    resumo: "Da bomba de vácuo à tampa traseira: o funcionamento do caminhão limpa-fossa e por que o tanque precisa ser reforçado.",
    capa: "/img/fotos/saneamento1.webp",
    capaAlt: "Tanque de saneamento branco com mangote laranja",
    corpo: [
      { p: "O caminhão de saneamento, também chamado de limpa-fossa ou caminhão a vácuo, aspira efluentes e lodo de fossas, caixas e redes e leva o material até uma estação de tratamento." },
      { h2: "O princípio", p: "Uma bomba de vácuo retira o ar de dentro do tanque. Com a pressão interna menor que a externa, o efluente é empurrado pelo mangote para dentro do tanque. Para descarregar, o processo pode ser invertido ou a tampa traseira é aberta." },
      { h2: "Por que o tanque é diferente", p: "Trabalhando sob vácuo, o corpo do tanque é pressionado de fora para dentro. Chapas e anéis de reforço são dimensionados para que ele não deforme, ciclo após ciclo." },
      { h2: "Componentes principais", lista: ["Bomba de vácuo acionada pelo caminhão", "Válvulas de segurança e de retenção que protegem a bomba", "Mangotes e suportes para transporte", "Tampa traseira basculante para descarga e limpeza interna"] },
      { p: "A escolha do volume, da bomba e dos acessórios depende do tipo de serviço: atendimento residencial, desobstrução de redes ou operação contínua para concessionárias e prefeituras." },
    ],
  },
  {
    slug: "tanque-estacionario-de-combustivel",
    tags: ["Estacionário", "Instalação"],
    titulo: "Tanque estacionário de combustível: vantagens e cuidados na instalação",
    data: "2026-09-09",
    categoria: "Estacionário",
    resumo: "Combustível no próprio pátio reduz deslocamentos e máquinas paradas. Veja o que considerar no projeto e na instalação.",
    capa: "/img/fotos/tanques_estacionario2.webp",
    capaAlt: "Tanque estacionário branco com bomba e medidor",
    corpo: [
      { p: "Fazendas, obras, transportadoras e indústrias que consomem diesel todos os dias ganham tempo e controle com um tanque estacionário no próprio local." },
      { h2: "As vantagens", lista: ["Máquinas e veículos abastecidos sem sair da operação", "Controle de consumo por medidor", "Compra de combustível em volume", "Menos deslocamento até o posto"] },
      { h2: "Fabricação", p: "Tanques aéreos de combustível seguem a ABNT NBR 15461, que define requisitos de fabricação e ensaios para tanques de aço com contenção primária e secundária. A contenção secundária, com parede dupla ou bacia, segura um eventual vazamento antes que ele chegue ao solo." },
      { h2: "Instalação", p: "A instalação precisa atender às exigências do Corpo de Bombeiros do estado e da NR 20, que tratam de distâncias de segurança, aterramento, sinalização e combate a incêndio. Por isso, o projeto começa pelo local: volume de consumo, acesso do caminhão de abastecimento e espaço de operação." },
      { p: "O tanque pode sair de fábrica com bomba, filtro, medidor e mangueira instalados, pronto para operar." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatData = (d: string) => {
  const [a, m, dia] = d.split("-");
  return `${dia}/${m}/${a}`;
};
export const tempoLeitura = (p: Post) => {
  const palavras = p.corpo.map((b) => [b.h2, b.p, ...(b.lista ?? [])].join(" ")).join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(palavras / 200));
};
