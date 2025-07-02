// CONFIGURAÇÃO DO AIO
const AIO_USER = "mateus_333";
const AIO_KEY = "aio_vDUA592m0UzKsFJUUyCUl8oYtMt3";
const headers = { "X-AIO-Key": AIO_KEY };

// FUNÇÃO: Buscar dados de temperatura e umidade
async function atualizarDados() {
  try {
    const [resTemp, resUmid] = await Promise.all([
      fetch(`https://io.adafruit.com/api/v2/${AIO_USER}/feeds/temperatura/data/last`, { headers }),
      fetch(`https://io.adafruit.com/api/v2/${AIO_USER}/feeds/umidade/data/last`, { headers })
    ]);

    const temp = await resTemp.json();
    const umid = await resUmid.json();

    document.getElementById('valor-temp').textContent = temp.value;
    document.getElementById('valor-umid').textContent = umid.value;
    document.getElementById('status-temp').textContent = "Atualizado";
    document.getElementById('status-umid').textContent = "Atualizado";
  } catch (error) {
    document.getElementById('status-temp').textContent = "Erro ao atualizar";
    document.getElementById('status-umid').textContent = "Erro ao atualizar";
    console.error("Erro ao buscar dados:", error);
  }
}

// INICIAR ATUALIZAÇÃO AUTOMÁTICA
atualizarDados();
setInterval(atualizarDados, 5000);

// ENVIAR COMANDOS DE CONTROLE
function enviarComando(feed, valor) {
  fetch(`https://io.adafruit.com/api/v2/${AIO_USER}/feeds/${feed}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AIO-Key": AIO_KEY
    },
    body: JSON.stringify({ value })
  }).then(response => {
    if (!response.ok) {
      console.error(`Erro ao enviar comando para ${feed}`);
    }
  }).catch(error => console.error(`Falha no comando ${feed}:`, error));
}

// EVENTOS DOS SWITCHES
document.getElementById('irrigacao-auto').addEventListener('change', e => {
  enviarComando("irrigacao-auto", e.target.checked ? "ON" : "OFF");
});

document.getElementById('irrigacao-manual').addEventListener('change', e => {
  enviarComando("irrigacao-manual", e.target.checked ? "ON" : "OFF");
});

document.getElementById('luz-auto').addEventListener('change', e => {
  enviarComando("luz-auto", e.target.checked ? "ON" : "OFF");
});

document.getElementById('luz-forcada').addEventListener('change', e => {
  enviarComando("luz-forcada", e.target.checked ? "ON" : "OFF");
});
