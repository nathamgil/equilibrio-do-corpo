/* =====================================================================
   Equilíbrio do Corpo — dados de EXEMPLO do modo demonstração.
   Só roda com o Supabase desligado. Clientes fictícias, marcadas
   "(exemplo)". Valores de plano em R$ também fictícios: mostram o funil,
   não são preço da clínica. Sessões vêm "do site"; as sessões do
   protocolo ("Sessão · ...") são as que a clínica marca no painel.
   Carrega depois de config.js e antes de agenda.js / admin.js.
   ===================================================================== */
(function () {
  'use strict';
  var CFG = window.TV;
  if (!CFG || !CFG.modoDemo) return;
  var PFX = CFG.prefixoDemo || 'dv_';
  var VERSAO = PFX + 'semeado_v1';
  try { if (localStorage.getItem(VERSAO)) return; } catch (e) { return; }

  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function exp(d) { return (CFG.expediente || {})[d.getDay()] || {}; }
  function dia(off) {
    var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + off);
    for (var i = 0; i < 7 && !exp(d).aberto; i++) d.setDate(d.getDate() + (off < 0 ? -1 : 1));
    return iso(d);
  }
  function deIso(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function outroDia(s, passo) { var d = deIso(s); do { d.setDate(d.getDate() + passo); } while (!exp(d).aberto); return iso(d); }
  function criado(off) { var d = new Date(); d.setDate(d.getDate() + off); d.setHours(9, 40, 0, 0); return d.toISOString(); }
  function min(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function hora(m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }
  function nomeT(id) { var s = CFG.servicoPor(id); return s ? s.nome : id; }
  function obs(objetivo, extras, relato) {
    return ['Objetivo: ' + objetivo].concat(extras || [], relato ? ['Relato: ' + relato] : []).join('\n');
  }

  // [cliente, tratamento, dia, início, etapa, obs, valor do plano, entrada, entrada paga, criado há n dias, sessões [[dia, hora], ...]]
  var P = [
    ['Juliana S.',  'massagem-relaxante', dia(1),  '18:00', 'novo',      obs('Relaxar e desacelerar', [], 'Semana pesada no trabalho'), 0, 0, false, 0, []],
    ['Marcos T.',   'acupuntura',         dia(2),  '14:00', 'novo',      obs('Alívio de dores', [], 'Dor lombar há meses'), 0, 0, false, 0, []],
    ['Patrícia M.', 'auriculoterapia',    dia(3),  '11:00', 'novo',      obs('Estresse e ansiedade'), 0, 0, false, -1, []],
    ['Ricardo A.',  'quick-massage',      dia(1),  '15:00', 'conversa',  obs('Bem-estar na minha empresa', [], 'Quero levar quick massage para 25 colaboradores'), 0, 0, false, -2, []],
    ['Carla B.',    'relaxamento-facial', dia(2),  '16:30', 'conversa',  obs('Ombros e pescoço tensos'), 0, 0, false, -2, []],
    ['Renata V.',   'acupuntura',         dia(-2), '10:00', 'orcado',    obs('Alívio de dores', [], 'Quer pacote de sessões'), 48000, 0, false, -6, []],
    ['Simone A.',   'massagem-relaxante', dia(-3), '19:00', 'orcado',    obs('Relaxar e desacelerar'), 36000, 0, false, -7, []],
    ['Mônica C.',   'auriculoterapia',    dia(-6), '12:00', 'marcado',   obs('Estresse e ansiedade'), 32000, 8000, true, -9, [[dia(-3), '12:00'], [dia(0), '12:00'], [dia(4), '12:00']]],
    ['Paulo R.',    'acupuntura',         dia(-8), '17:00', 'marcado',   obs('Alívio de dores'), 52000, 13000, true, -11, [[dia(-4), '17:00'], [dia(1), '17:00'], [dia(5), '17:00']]],
    ['Daniela F.',  'massagem-relaxante', dia(-5), '19:30', 'marcado',   obs('Ombros e pescoço tensos'), 40000, 10000, true, -8, [[dia(0), '19:30'], [dia(3), '19:30']]],
    ['Luciana P.',  'quick-massage',      dia(-20),'15:00', 'concluido', obs('Relaxar e desacelerar'), 18000, 0, true, -24, [[dia(-17), '15:00'], [dia(-13), '15:00']]],
    ['Bianca N.',   'relaxamento-facial', dia(-12),'15:00', 'recusado',  obs('Ombros e pescoço tensos', [], 'Só consegue domingo de manhã'), 0, 0, false, -14, []]
  ];

  var ocupado = {}, hoje = iso(new Date()), lista = [], n = 0;
  function encaixa(d, ini, dur) {
    for (var t = 0; t < 20; t++) {
      var e = exp(deIso(d)), fim = ini + dur;
      var dentro = e.aberto && fim <= min(e.fecha) && !(e.pausa && ini < min(e.pausa[1]) && fim > min(e.pausa[0]));
      var livre = !(ocupado[d] || []).some(function (o) { return ini < o[1] && fim > o[0]; });
      if (dentro && livre) break;
      d = outroDia(d, d < hoje ? -1 : 1);
    }
    (ocupado[d] = ocupado[d] || []).push([ini, ini + dur]);
    return d;
  }
  function item(pac, i, servico, d, h, etapa, extra) {
    var ini = min(h), dur = 60;
    var status = etapa === 'concluido' || (d < hoje && etapa !== 'recusado') ? 'concluido' : etapa === 'recusado' ? 'cancelado' : 'confirmado';
    if (status !== 'cancelado') d = encaixa(d, ini, dur);
    n++;
    return Object.assign({
      codigo: 'EX' + String(1000 + n), barbeiro_id: i % 3 === 2 ? 'paralela' : 'salvador-shopping', barbeiro: i % 3 === 2 ? 'Shopping Paralela' : 'Salvador Shopping',
      servico: servico, preco_centavos: 0, nome: pac[0] + ' (exemplo)',
      telefone: '719000000' + String(10 + i), dia: d, inicio: hora(ini), fim: hora(ini + dur),
      obs: '', status: status, anexos: [], exemplo: true, etapa: etapa,
      valor_centavos: 0, sinal_centavos: 0, sinal_pago: false, criado_em: criado(pac[9])
    }, extra || {});
  }
  P.forEach(function (p, i) {
    // sessão (veio do site)
    var st = p[4];
    var av = item(p, i, nomeT(p[1]), p[2], p[3], st, {
      obs: p[5], valor_centavos: p[6], sinal_centavos: p[7], sinal_pago: p[8]
    });
    // sessão futura ainda não aconteceu: status confirmado
    if ((st === 'novo' || st === 'conversa') && av.dia >= hoje) av.status = 'confirmado';
    lista.push(av);
    // sessões do protocolo (marcadas no painel)
    p[10].forEach(function (s) {
      lista.push(item(p, i, 'Sessão · ' + nomeT(p[1]), s[0], s[1], s[0] < hoje ? 'concluido' : 'marcado',
        { obs: 'Sessão do protocolo de ' + nomeT(p[1]), sessao: true, origem: 'painel', criado_em: av.criado_em }));
    });
  });

  var bloqueios = [{ id: 'b1', barbeiro_id: 'salvador-shopping', data: dia(11), hora_inicio: '00:00', hora_fim: '23:59', motivo: 'Manutenção da unidade (exemplo)' }];
  try {
    localStorage.setItem(PFX + 'agendamentos_demo', JSON.stringify(lista));
    localStorage.setItem(PFX + 'bloqueios_demo', JSON.stringify(bloqueios));
    localStorage.removeItem(PFX + 'artistas_demo');
    localStorage.setItem(PFX + 'demo_semeado_v1', '1');
    localStorage.setItem(VERSAO, '1');
  } catch (e) {}
})();
