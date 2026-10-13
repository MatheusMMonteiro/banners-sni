const STORAGE_KEY = 'convite-sni:v1';

export const DEFAULT_DATA = {
  modelo: 'verde',
  convite: 'Associação Pomba Branca da\nSeicho No Ie do Brasil\nBalneário Gaivotas - Itanhaém',
  whatsapp: '(00) 00000-0000',
  tipo: 'presencial',
  endereco: 'Rua Exemplo, 123 - Bairro - Cidade',
  tema: 'O poder da Fé',
  livro: 'Aos que buscam a Prosperidade',
  cargo: 'Preletor em Grau Júnior',
  preletor: 'Nome do Preletor',
  data: '',
  horario: '20h',
  mensagem: 'Sua presença é muito importante!',
  logos: { pombaBranca: true, seichoNoIe: true, emblema: false },
};

// Campos que mudam a cada reunião; o resto se repete e permanece.
const EVENT_FIELDS = ['tema', 'livro', 'preletor', 'data'];

export function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) return { ...DEFAULT_DATA, ...saved, logos: { ...DEFAULT_DATA.logos, ...saved.logos } };
  } catch {
    // Sem armazenamento disponível: segue com os valores padrão.
  }
  return { ...DEFAULT_DATA, data: nextSundayIso() };
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Navegador sem armazenamento: o banner continua funcionando, só não lembra.
  }
}

export function clearEventFields(data) {
  const cleared = { ...data };
  EVENT_FIELDS.forEach((field) => {
    cleared[field] = '';
  });
  return cleared;
}

function nextSundayIso() {
  const date = new Date();
  date.setDate(date.getDate() + ((7 - date.getDay()) % 7 || 7));
  return toIso(date);
}

function toIso(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const WEEKDAYS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function weekdayName(iso) {
  const date = parseIso(iso);
  return date ? WEEKDAYS[date.getDay()] : '';
}

function parseIso(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return match ? new Date(+match[1], +match[2] - 1, +match[3]) : null;
}

// Converte o formulário nos textos prontos que os modelos desenham.
export function toBannerText(data) {
  const date = parseIso(data.data);
  const presencial = data.tipo === 'presencial';
  const horario = data.horario.trim();

  return {
    convite: data.convite.trim(),
    whatsapp: data.whatsapp.trim(),
    tipo: presencial ? 'Reunião Presencial' : 'Reunião Virtual',
    tipoCurto: presencial ? 'Presencial' : 'Virtual',
    tema: data.tema.trim(),
    livro: data.livro.trim() ? `Livro: ${data.livro.trim()}` : '',
    cargo: data.cargo.trim(),
    preletor: data.preletor.trim(),
    dataLonga: date ? `Dia ${date.getDate()} de ${MONTHS[date.getMonth()]}` : '',
    diaNumero: date ? String(date.getDate()) : '',
    diaSemana: date ? WEEKDAYS[date.getDay()] : '',
    diaSemanaCurto: date ? WEEKDAYS[date.getDay()].replace('-feira', '') : '',
    // "20h" vira "Às 20h"; textos livres como "Das 8h30 às 11h" ficam como estão.
    horario: /^\d/.test(horario) ? `Às ${horario}` : horario,
    endereco: presencial && data.endereco.trim() ? `Endereço: ${data.endereco.trim()}` : '',
    mensagem: data.mensagem.trim(),
  };
}
