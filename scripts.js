// script.js completo com Adafruit IO + Chart.js

const AIO_USER = "mateus_333";
const AIO_KEY = "aio_vDUA592m0UzKSfJUUYcUl8oYtMt3";
const HEADERS = { "X-AIO-Key": AIO_KEY };

const FEEDS = {
  temp: "temperatura",
  umid: "umidade",
  irrigacaoAuto: "irrigacao-auto",
  irrigacaoManual: "irrigacao-manual",
  luzAuto: "luz-auto",
  luzForcada: "luz-forcada"
};

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg.scope))
      .catch(err => console.error('Erro ao registrar SW:', err));
  });
}

// =================== Gráficos ====================
const labels = ["21h", "22h", "23h", "00h", "01h", "02h", "03h", "04h", "05h", "06h", "07h", "08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h"];
const tempData = [25.7, 23.3, 34.3, 22.3, 25.7, 30.2, 29.9, 32.9, 31.5, 33.4, 25.3, 33.4, 27.8, 23.6, 26.6, 23.6, 26.9, 33.8, 33.0, 22.2, 33.0, 23.9, 34.4, 35.0];
const umidData = [65.7, 64.8, 64.6, 64.7, 74.8, 54.7, 72.3, 71.5, 45.9, 60.0, 46.4, 52.3, 56.0, 52.2, 61.1, 57.5, 63.3, 64.7, 59.2, 46.1, 47.5, 56.3, 46.7, 50.6];

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

// ============ Atualizar Dashboard com dados reais ============
async function atualizarDados() {
  try {
    const [respTemp, respUmid] = await Promise.all([
      fetch(`https://io.adafruit.com/api/v2/${AIO_USER}/feeds/${FEEDS.temp}/data?limit=1`, { headers: HEADERS }),
      fetch(`https://io.adafruit.com/api/v2/${AIO_USER}/feeds/${FEEDS.umid}/data?limit=1`, { headers: HEADERS })
    ]);

    const temp = await respTemp.json();
    const umid = await respUmid.json();

    const valorTemp = parseFloat(temp[0].value);
    const valorUmid = parseFloat(umid[0].value);

    document.getElementById("valor-temp").textContent = valorTemp;
    document.getElementById("valor-umid").textContent = valorUmid;

    atualizarStatus("temp", valorTemp, 25, 35);
    atualizarStatus("umid", valorUmid, 50, 70);

    const hora = new Date().getHours() + "h";
    labels.push(hora);
    tempChart.data.labels = labels.slice(-24);
    umidChart.data.labels = labels.slice(-24);
    tempChart.data.datasets[0].data.push(valorTemp);
    umidChart.data.datasets[0].data.push(valorUmid);
    tempChart.data.datasets[0].data = tempChart.data.datasets[0].data.slice(-24);
    umidChart.data.datasets[0].data = umidChart.data.datasets[0].data.slice(-24);
    tempChart.update();
    umidChart.update();

  } catch (err) {
    console.error("Erro ao buscar dados do Adafruit IO:", err);
  }
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

// ============ Controles interativos com Adafruit ============
function enviarComando(feed, valor) {
  fetch(`https://io.adafruit.com/api/v2/${AIO_USER}/feeds/${feed}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AIO-Key": AIO_KEY
    },
    body: JSON.stringify({ value })
  }).then(() => console.log(`Comando enviado: ${feed} = ${valor}`))
    .catch(err => console.error("Erro ao enviar comando:", err));
}

document.querySelectorAll('.switch input').forEach(input => {
  input.addEventListener('change', () => {
    const feed = input.id.replace("-", "-");
    const valor = input.checked ? 1 : 0;
    enviarComando(feed, valor);
  });
});
