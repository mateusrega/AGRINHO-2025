const WORKER_BASE_URL = "/api/adafruit";

const FEEDS = {
  temp: "temperatura",
  umid: "umidade",
  irrigacaoAuto: "irrigacao-auto",
  irrigacaoManual: "irrigacao-manual",
  luzAuto: "luz-auto",
  luzForcada: "luz-forcada"
};

// Service Worker (se tiver)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg.scope))
      .catch(err => console.error('Erro ao registrar SW:', err));
  });
}

// Gráficos (exemplo com Chart.js)
const labels = ["21h", "22h", "23h", "00h", "01h", "02h", "03h", "04h", "05h", "06h", "07h", "08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h"];
const tempData = Array(24).fill(null);
const umidData = Array(24).fill(null);

const tempChart = new Chart(document.getElementById("tempChart").getContext("2d"), {
  type: "line",
  data: {
    labels,
    datasets: [{
      label: "Temperatura (°C)",
      data: tempData,
      borderColor: "#d94bb5",
      backgroundColor: "rgba(217, 75, 181, 0.1)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { min: 15, max: 40 }
    }
  }
});

const umidChart = new Chart(document.getElementById("umidChart").getContext("2d"), {
  type: "line",
  data: {
    labels,
    datasets: [{
      label: "Umidade (%)",
      data: umidData,
      borderColor: "#4bd9a0",
      backgroundColor: "rgba(75, 217, 160, 0.1)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { min: 30, max: 90 }
    }
  }
});

// Função para buscar feed via proxy
async function fetchFeed(feed) {
  try {
    const res = await fetch(`${WORKER_BASE_URL}?feed=${feed}`);
    if (!res.ok) throw new Error("Erro na requisição");
    const data = await res.json();
    return data.value;
  } catch (err) {
    console.error("Erro ao buscar feed:", err);
    return null;
  }
}

async function atualizarDados() {
  const valorTemp = await fetchFeed("temperatura");
  const valorUmid = await fetchFeed("umidade");

  if (valorTemp !== null) {
    document.getElementById("valor-temp").textContent = valorTemp;
    atualizarStatus("temp", parseFloat(valorTemp), 25, 35);

    tempChart.data.datasets[0].data.push(parseFloat(valorTemp));
    tempChart.data.datasets[0].data.shift();
  }

  if (valorUmid !== null) {
    document.getElementById("valor-umid").textContent = valorUmid;
    atualizarStatus("umid", parseFloat(valorUmid), 50, 70);

    umidChart.data.datasets[0].data.push(parseFloat(valorUmid));
    umidChart.data.datasets[0].data.shift();
  }

  tempChart.update();
  umidChart.update();
}

function atualizarStatus(tipo, valor, min, max) {
  const status = document.getElementById(`status-${tipo}`);
  if (valor < min) {
    status.textContent = "Abaixo do ideal";
    status.style.background = "rgba(255, 77, 77, 0.2)";
    status.style.color = "#ff4d4d";
  } else if (valor > max) {
    status.textContent = "Acima do ideal";
    status.style.background = "rgba(255, 204, 0, 0.2)";
    status.style.color = "#ffcc00";
  } else {
    status.textContent = "Condição ideal";
    status.style.background = "rgba(75, 217, 111, 0.2)";
    status.style.color = "#4bd96f";
  }
}

setInterval(atualizarDados, 5000);
atualizarDados();

// Controles interativos, exemplo de envio de comando
function enviarComando(feed, valor) {
  fetch(`${WORKER_BASE_URL}?feed=${feed}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ value: valor })
  })
  .then(() => console.log(`Comando enviado: ${feed} = ${valor}`))
  .catch(err => console.error("Erro ao enviar comando:", err));
}

document.querySelectorAll('.switch input').forEach(input => {
  input.addEventListener('change', () => {
    const feed = input.id.replace("-", "-");
    const valor = input.checked ? 1 : 0;
    enviarComando(feed, valor);
  });
});
const ajudaBtn = document.getElementById('ajuda-btn');
const modalAjuda = document.getElementById('modal-ajuda');
const closeAjuda = document.querySelector('.modal .close');

ajudaBtn.addEventListener('click', () => {
  modalAjuda.style.display = 'block';
});

closeAjuda.addEventListener('click', () => {
  modalAjuda.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modalAjuda) {
    modalAjuda.style.display = 'none';
  }
});
