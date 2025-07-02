const ADAFRUIT_IO_USERNAME = process.env.AIO_USER;
const ADAFRUIT_IO_KEY = process.env.AIO_KEY;

const FEEDS = {
  temperatura: "temperatura",
  umidade: "umidade",
  irrigacaoAuto: "irrigacao-auto",
  irrigacaoManual: "irrigacao-manual",
  luzAuto: "luz-auto",
  luzForcada: "luz-forcada"
};

export default async function handler(req, res) {
  const feed = req.query.feed;

  if (!FEEDS[feed]) {
    return res.status(404).json({ error: "Feed inválido" });
  }

  const url = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${FEEDS[feed]}/data?limit=1`;

  try {
    if (req.method === "GET") {
      const response = await fetch(url, {
        headers: { "X-AIO-Key": ADAFRUIT_IO_KEY }
      });
      const data = await response.json();
      return res.status(200).json({ value: data[0]?.value || null });
    } else if (req.method === "POST") {
      const { value } = req.body;
      if (value === undefined) {
        return res.status(400).json({ error: "Campo 'value' é obrigatório" });
      }

      const postUrl = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${FEEDS[feed]}/data`;
      const postResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": ADAFRUIT_IO_KEY
        },
        body: JSON.stringify({ value })
      });

      if (!postResponse.ok) {
        return res.status(postResponse.status).json({ error: "Erro ao enviar dados" });
      }

      return res.status(200).json({ success: true });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
