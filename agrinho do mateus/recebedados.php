<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $temperatura = $_POST['temperatura'];
    $umidade = $_POST['umidade'];

    // Salvar em um arquivo
    $arquivo = fopen("dados.txt", "a");
    fwrite($arquivo, date("Y-m-d H:i:s") . " - Temp: $temperatura °C, Umid: $umidade%\n");
    fclose($arquivo);

    echo "Dados recebidos com sucesso!";
} else {
    echo "Método HTTP inválido!";
}
?>
