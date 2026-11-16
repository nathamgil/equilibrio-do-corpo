/* =====================================================================
   Equilíbrio do Corpo — configuração
   Fonte: Instagram @grupoequilibriodocorpo (16/11/2026). Bio: "Seu corpo é
   a sua morada, cuide dele", há 10 anos, +20 mil atendimentos, unidades
   Shopping Paralela (Piso L1) e Salvador Shopping (G2). Serviços tirados
   das legendas recentes. Preços, duração, horários e WhatsApp: A CONFIRMAR.
   ===================================================================== */
window.TV = {
  nome:        'Equilíbrio do Corpo',
  nomeCurto:   'Equilíbrio do Corpo',
  slogan:      'Seu corpo é a sua morada, cuide dele',
  instagram:   'grupoequilibriodocorpo',
  prefixoDemo: 'edc_',
  logo:        'assets/monograma.svg',

  textoPreco: 'Sob consulta',
  rotServico: 'Terapia',
  textoSite:  'Agendei minha sessão pelo site da Equilíbrio do Corpo.',
  contatoTxt: 'chame a unidade no WhatsApp',

  // WhatsApp: A CONFIRMAR (não aparece na bio). Enquanto isso, o botão abre o Instagram.
  whatsappLink:    'https://www.instagram.com/grupoequilibriodocorpo/',
  whatsapp:        '',
  whatsappVisivel: '',

  endereco: {
    linha1: 'Salvador Shopping, Piso G2 · Shopping Paralela, Piso L1',
    linha2: 'Salvador — BA',
    maps:   'https://www.google.com/maps/search/?api=1&query=Equil%C3%ADbrio+do+Corpo+Salvador+Shopping',
    embed:  '',
    busca:  'Equilíbrio do Corpo, Salvador Shopping, Salvador - BA'
  },
  funcionamento: 'Horário do shopping (a confirmar)',

  supabaseUrl: '',
  supabaseKey: '',

  regras: { passoMin: 30, antecedenciaMin: 60, janelaDias: 30, cancelamentoH: 4 },
  semPreferencia: false,

  /* Expediente de exemplo (horário típico de shopping) — A CONFIRMAR */
  expediente: {
    0: { aberto: true, abre: '13:00', fecha: '20:00' },
    1: { aberto: true, abre: '10:00', fecha: '21:00' },
    2: { aberto: true, abre: '10:00', fecha: '21:00' },
    3: { aberto: true, abre: '10:00', fecha: '21:00' },
    4: { aberto: true, abre: '10:00', fecha: '21:00' },
    5: { aberto: true, abre: '10:00', fecha: '21:00' },
    6: { aberto: true, abre: '10:00', fecha: '21:00' }
  },

  /* "Com quem" = em qual UNIDADE (equipe: a confirmar) */
  artistas: [
    { slug: 'salvador-shopping', nome: 'Salvador Shopping', apelido: 'Salvador Shopping', instagram: 'grupoequilibriodocorpo', whatsapp: '',
      foto: '', oficio: 'Unidade', linha: 'Piso G2',
      estilos: ['Massagem relaxante', 'Quick massage', 'Acupuntura', 'Auriculoterapia', 'Relaxamento facial'] },
    { slug: 'paralela', nome: 'Shopping Paralela', apelido: 'Shopping Paralela', instagram: 'grupoequilibriodocorpo', whatsapp: '',
      foto: '', oficio: 'Unidade', linha: 'Piso L1',
      estilos: ['Massagem relaxante', 'Quick massage', 'Acupuntura', 'Auriculoterapia', 'Relaxamento facial'] }
  ],

  objetivos: [
    { id: 'relaxar',   nome: 'Relaxar e desacelerar',      icone: '◌' },
    { id: 'tensao',    nome: 'Ombros e pescoço tensos',     icone: '◐' },
    { id: 'ansiedade', nome: 'Estresse e ansiedade',        icone: '◇' },
    { id: 'dor',       nome: 'Alívio de dores',             icone: '◎' },
    { id: 'empresa',   nome: 'Bem-estar na minha empresa',  icone: '✚' },
    { id: 'todos',     nome: 'Ainda não sei',               icone: '?' }
  ],

  /* Terapias citadas nas legendas recentes. Preço e duração: A CONFIRMAR. */
  servicosDemo: [
    { id:'massagem-relaxante', nome:'Massagem relaxante', categoria:'Massagens', objetivos:['relaxar','tensao','ansiedade'],
      descricao:'Deslizamentos e amassamentos leves, em pressão confortável, para soltar o corpo.', preco_centavos:0, a_partir_de:false, duracao_min:60,
      selo:'Mais procurada', fonte:'Legenda do Instagram',
      paraQuem:'Para quem carrega ombros pesados, pescoço tenso e um cansaço que o descanso comum não resolve.',
      sessao:'Movimentos suaves e contínuos, em pressão confortável.' },
    { id:'quick-massage', nome:'Quick massage', categoria:'Massagens', objetivos:['tensao','relaxar','empresa'],
      descricao:'Massagem rápida, também levada até a sua empresa.', preco_centavos:0, a_partir_de:false, duracao_min:30, fonte:'Legenda do Instagram',
      paraQuem:'Para a pausa do dia a dia e para empresas que querem cuidar da equipe sem sair do escritório.',
      sessao:'Sessão curta, com foco em costas, ombros e pescoço.' },
    { id:'acupuntura', nome:'Acupuntura sistêmica', categoria:'Terapias', objetivos:['dor','ansiedade'],
      descricao:'Baseada na medicina tradicional chinesa: trabalha o equilíbrio geral do organismo.', preco_centavos:0, a_partir_de:false, duracao_min:60, fonte:'Legenda do Instagram',
      paraQuem:'Para quem busca alívio de dores e redução do estresse.',
      sessao:'Pontos específicos, cada um ligado a diferentes funções do corpo.' },
    { id:'auriculoterapia', nome:'Auriculoterapia', categoria:'Terapias', objetivos:['ansiedade','dor'],
      descricao:'A orelha é um mapa do corpo: pontos estimulados de forma suave e não invasiva.', preco_centavos:0, a_partir_de:false, duracao_min:30, fonte:'Legenda do Instagram',
      paraQuem:'Para quem quer ajuda no alívio do estresse e da ansiedade.',
      sessao:'Suave, não invasiva e profundamente relaxante.' },
    { id:'relaxamento-facial', nome:'Relaxamento facial', categoria:'Terapias', objetivos:['tensao','relaxar'],
      descricao:'Trabalha a musculatura do rosto: testa franzida, mandíbula travada, olhos cansados.', preco_centavos:0, a_partir_de:false, duracao_min:30, fonte:'Legenda do Instagram',
      paraQuem:'Para quem sente a tensão do dia no rosto.',
      sessao:'Toques cuidadosos para soltar a musculatura facial.' },
    { id:'nao-sei', nome:'Quero uma indicação', categoria:'Ainda não sei', objetivos:['*'],
      descricao:'A equipe conversa com você e indica a terapia certa.', preco_centavos:0, a_partir_de:false, duracao_min:30, fonte:'—',
      paraQuem:'Para quem ainda não sabe qual terapia escolher.', sessao:'Conversa rápida antes da sessão.' }
  ]
};

window.TV.barbeirosDemo = window.TV.artistas.map(function (a) {
  return { id: a.slug, slug: a.slug, nome: a.nome, foto: a.foto, instagram: a.instagram,
           whatsapp: a.whatsapp, cargo: a.linha };
});
window.TV.artistaPor = function (chave) {
  return window.TV.artistas.filter(function (a) {
    return a.slug === chave || a.nome === chave || a.instagram === chave;
  })[0] || null;
};
window.TV.servicoPor = function (id) {
  return window.TV.servicosDemo.filter(function (s) { return s.id === id; })[0] || null;
};
window.TV.modoDemo = !(window.TV.supabaseUrl && window.TV.supabaseKey);
