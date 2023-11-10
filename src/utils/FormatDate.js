export {
  dataAtualFormatada,
  dataBrSemMascara,
  dataBr,
  mesAnoBr,
  mesAnteriorBr,
  populateYearOptions,
  replace,
} 

const dataAtualFormatada = (date) => {
  let data = new Date(date);
  let dia = data.getDate().toString();
  let diaF = dia.length == 1 ? "0" + dia : dia;
  let mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
  let mesF = mes.length == 1 ? "0" + mes : mes;
  let anoF = data.getFullYear();
  return anoF + "-" + mesF + "-" + diaF;
}

// data sem mascara
const dataBrSemMascara = (date) => {
  let data = new Date(date);
  let dia = data.getDate().toString();
  let diaF = dia.length == 1 ? "0" + dia : dia;
  let mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
  let mesF = mes.length == 1 ? "0" + mes : mes;
  let anoF = data.getFullYear();
  return diaF + mesF + anoF;
}
// americano para br
const dataBr = (date) => {
  let data = new Date(date);
  let dia = data.getDate().toString();
  let diaF = dia.length == 1 ? "0" + dia : dia;
  let mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
  let mesF = mes.length == 1 ? "0" + mes : mes;
  let anoF = data.getFullYear();
  return diaF + '/' + mesF + '/' + anoF;
}
// converte data americana para Mês(nome)/Ano
const mesAnoBr = (date) => {
  const year = date.substr(0, 4)
  const monthNumber = date.substr(5, 2)
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  return months[monthNumber - 1] + '/' + year;
}

// retorna sempre o mês anterior ao atual
const mesAnteriorBr = () => {
  const currentDate = new Date();
  const mesAtual = currentDate.getMonth();
  const anoAtual = currentDate.getFullYear();

  return `${anoAtual}-${String(mesAtual).padStart(2, "0")}`;
}


const populateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  var result = []
  for (let i = currentYear; i >= startYear; i--) {
    result.push(i.toString());
  }
  return result;
}

const replace = (data) => {
  return data.replace(/[^a-zA-Z0-9]/g, "");
}
const calculateAge = (birthdate) => {
  var today = new Date();
  var birthDate = new Date(birthdate);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

