const ADAFRUIT_IO_USERNAME = "mateus_321";  // Substitua pelo seu usuário Adafruit IO
const ADAFRUIT_IO_KEY = "mateus_321";      // Substitua pela sua chave Adafruit IO
const FEED_TEMPERATURA = "temperatura";       // Nome do feed de temperatura
const FEED_UMIDADE = "umidade";                // Nome do feed de umidade

async function buscarDados() {
  try {
    const urlTemp = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${FEED_TEMPERATURA}/data?limit=10`;
    const urlUmid = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${FEED_UMIDADE}/data?limit=10`;

    const headers = {
      "X-AIO-Key": ADAFRUIT_IO_KEY
    };

    const [respTemp, respUmid] = await Promise.all([
      fetch(urlTemp, { headers }),
      fetch(urlUmid, { headers })
    ]);

    const dadosTemp = await respTemp.json();
    const dadosUmid = await respUmid.json();

    let texto = "";
    for(let i = 0; i < dadosTemp.length; i++) {
      const temp = dadosTemp[i];
      const umid = dadosUmid[i];
      texto += `${new Date(temp.created_at).toLocaleString()} - Temp: ${temp.value} °C, Umid: ${umid.value} %\n`;
    }

    document.getElementById("dados").textContent = texto || "Nenhum dado disponível ainda.";
  } catch (error) {
    document.getElementById("dados").textContent = "Erro ao buscar dados: " + error;
  }
}

buscarDados();
setInterval(buscarDados, 5000);
