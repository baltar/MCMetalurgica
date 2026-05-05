// DIGITAÇÃO - só roda se estiver na home
const titulo = document.querySelector('.hero-titulo');
if (titulo) {
  const texto = "Fabricamos equipamentos sob medida para o seu trabalho pesado";
  const destaque = "sob medida";
  let i = 0;

  function digitar() {
    if (i <= texto.length) {
      const parte = texto.substring(0, i);
      const comDestaque = parte.replace(destaque, `<span>${destaque}</span>`);
      titulo.innerHTML = comDestaque + '<span class="cursor">|</span>';
      i++;
      setTimeout(digitar, 50);
    } else {
      setTimeout(() => {
        document.querySelector('.cursor').style.display = 'none';
      }, 5000);
    }
  }

  digitar();
}

// CONTADOR - só roda se estiver no sobre
document.addEventListener('DOMContentLoaded', () => {
  const secaoNumeros = document.querySelector('.numeros');

  if (secaoNumeros) {
    const observador = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const contadores = document.querySelectorAll('.numero-valor');
          contadores.forEach(contador => {
            const valorFinal = parseInt(contador.getAttribute('data-valor'));
            const duracao = 2000;
            const incremento = valorFinal / (duracao / 16);
            let valorAtual = 0;

            const timer = setInterval(() => {
              valorAtual += incremento;
              if (valorAtual >= valorFinal) {
                contador.textContent = valorFinal + '+';
                clearInterval(timer);
              } else {
                contador.textContent = Math.floor(valorAtual);
              }
            }, 16);
          });
          observador.disconnect();
        }
      });
    });

    observador.observe(secaoNumeros);
  }
});

// FORMULÁRIO EMAILJS
function enviarFormulario() {
  const nome = document.getElementById('nome')?.value;
  if (!nome) return;

  emailjs.init('SUA_PUBLIC_KEY');

  const params = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    mensagem: document.getElementById('mensagem').value,
  };

  const status = document.getElementById('form-status');
  status.textContent = 'Enviando...';
  status.style.color = '#666';

  emailjs.send('SUA_SERVICE_ID', 'SUA_TEMPLATE_ID', params) // MUDAR OS IDS PROS DE MARCELOS!!!!!!!!!!!!!!!!!!
    .then(() => {
      status.textContent = 'Mensagem enviada com sucesso!';
      status.style.color = 'green';
    })
    .catch(() => {
      status.textContent = 'Erro ao enviar. Tente pelo WhatsApp.';
      status.style.color = '#CC2B2B';
    });
}