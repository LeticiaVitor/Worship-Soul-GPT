document.addEventListener("DOMContentLoaded", () => {
  const versiculoEl = document.getElementById("versiculo");
  const referenciaEl = document.getElementById("referencia");

  fetch("data/versiculos.json")
    .then(response => response.json())
    .then(data => {
      const hoje = new Date();
      const dia = hoje.getDate();
      const mes = hoje.getMonth() + 1;
      const ano = hoje.getFullYear();

      const indiceDia = ano * 1000 + mes * 100 + dia;

      let categoria = "geral";

      // natal
      if (dia === 25 && mes === 12) categoria = "natal";

      // ano novoo
      if (dia === 1 && mes === 1) categoria = "anonovo";

      // pascoa
      const pascoa = calcularPascoa(ano);
      if (dia === pascoa.getDate() && mes === pascoa.getMonth() + 1) {
        categoria = "pascoa";
      }

      // pentecostes
      const pentecostes = new Date(pascoa);
      pentecostes.setDate(pentecostes.getDate() + 49);
      if (dia === pentecostes.getDate() && mes === pentecostes.getMonth() + 1) {
        categoria = "pentecostes";
      }

      // dia da biblia
      const diaBiblia = terceiroDomingo(ano, 9);
      if (dia === diaBiblia.getDate() && mes === 9) {
        categoria = "diadabiblia";
      }

      const lista = data[categoria] || data["geral"];
      const versiculo = lista[indiceDia % lista.length];

      versiculoEl.textContent = `"${versiculo.texto}"`;
      referenciaEl.textContent = versiculo.ref;
    })
    .catch(() => {
      versiculoEl.textContent = "Não foi possível carregar o versículo.";
      referenciaEl.textContent = "";
    });
});

// caucular a pasccoa (algoritmo de Gauss)
function calcularPascoa(ano) {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(ano, mes - 1, dia);
}

//primeiro domingo
function terceiroDomingo(ano, mes) {
  const primeiroDia = new Date(ano, mes - 1, 1);
  const diaSemana = primeiroDia.getDay();

  let primeiroDomingo = 1;
  if (diaSemana !== 0) {
    primeiroDomingo = 7 - diaSemana + 1;
  }

  const terceiroDomingo = primeiroDomingo + 14;
  return new Date(ano, mes - 1, terceiroDomingo);
}

const botaoIa = document.getElementById('ia-button');

botaoIa.addEventListener('click', () => {
  document.body.setAttribute('transition-style', 'in:wipe:right');

  setTimeout(() => {
    window.location.href = 'chat.html';
  }, 2500);
});

document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing");
  const fullText = typingElement.textContent;
  typingElement.textContent = "";

  let index = 0;

  function typeEffect() {
    if (index < fullText.length) {
      typingElement.textContent += fullText.charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    }
  }

  typeEffect();
});