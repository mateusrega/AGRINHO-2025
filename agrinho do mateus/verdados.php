<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>🌿 Monitoramento da Estufa</title>
  <meta http-equiv="refresh" content="5"> <!-- Atualiza a cada 5 segundos -->
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f2f2f2;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    header {
      background-color: #d94bb5;
      color: white;
      width: 100%;
      padding: 20px;
      text-align: center;
    }

    .dados-box {
      background-color: white;
      padding: 20px;
      margin-top: 30px;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 90%;
      max-width: 600px;
    }

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .atualizando {
      font-size: 14px;
      color: #777;
      margin-top: 10px;
    }

    a {
      color: #d94bb5;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <header>
    <h1>🌿 Monitoramento da Estufa</h1>
    <h3>Histórico de temperatura e umidade</h3>
  </header>

  <div class="dados-box">
    <h2>📋 Leituras:</h2>
    <pre>
<?php
  $arquivo = "dados.txt";
  if (file_exists($arquivo)) {
    $conteudo = file_get_contents($arquivo);
    echo htmlspecialchars($conteudo);
  } else {
    echo "Nenhum dado disponível ainda.";
  }
?>
    </pre>
    <p class="atualizando">⏳ Atualizando automaticamente a cada 5 segundos...</p>
    <p><a href="index.html">← Voltar para enviar novos dados</a></p>
  </div>
</body>
</html>
