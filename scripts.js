    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registrado com sucesso: ', registration.scope);
          })
          .catch(err => {
            console.log('Falha ao registrar ServiceWorker: ', err);
          });
      });
    } 

    // Dados iniciais para os gráficos
    const labels = Array.from({length: 24}, (_, i) => `${i}h`);
    const tempData = Array.from({length: 24}, () => Math.floor(20 + Math.random() * 15));
    const umidData = Array.from({length: 24}, () => Math.floor(40 + Math.random() * 40)); 

    // Configuração do gráfico de temperatura
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    const tempChart = new Chart(tempCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperatura (°C)',
          data: tempData,
          borderColor: '#d94bb5',
          backgroundColor: 'rgba(217, 75, 181, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 15,
            max: 40
          }
        }
      }
    }); 

    // Configuração do gráfico de umidade
    const umidCtx = document.getElementById('umidChart').getContext('2d');
    const umidChart = new Chart(umidCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Umidade do Ar (%)',
          data: umidData,
          borderColor: '#4bd9a0',
          backgroundColor: 'rgba(75, 217, 160, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 30,
            max: 90
          }
        }
      }
    }); 

    // Simulação de dados em tempo real
    function simularDados() {
      // Gerar valores aleatórios (simulando sensores)
      const temperatura = (20 + Math.random() * 10).toFixed(1);
      const umidade = (40 + Math.random() * 30).toFixed(1);
      const solo = (30 + Math.random() * 50).toFixed(1);
      
      // Atualizar valores no dashboard
      document.getElementById('valor-temp').textContent = temperatura;
      document.getElementById('valor-umid').textContent = umidade;
      document.getElementById('valor-solo').textContent = solo;
      
      // Atualizar status
      updateStatus('temp', temperatura, 25, 35);
      updateStatus('umid', umidade, 50, 70);
      updateStatus('solo', solo, 40, 60);
      
      // Atualizar gráficos (adicionar novos pontos)
      const now = new Date();
      const hour = now.getHours();
      labels.push(`${hour}h`);
      tempChart.data.labels = labels.slice(-24);
      umidChart.data.labels = labels.slice(-24);
      tempChart.data.datasets[0].data.push(temperatura);
      umidChart.data.datasets[0].data.push(umidade);
      tempChart.data.datasets[0].data = tempChart.data.datasets[0].data.slice(-24);
      umidChart.data.datasets[0].data = umidChart.data.datasets[0].data.slice(-24);
      tempChart.update();
      umidChart.update();
    }
    
    // Função para atualizar status com base em valores ideais
    function updateStatus(type, value, min, max) {
      const numValue = parseFloat(value);
      const element = document.getElementById(`status-${type}`);
      
      if (numValue < min) {
        element.textContent = "Abaixo do ideal";
        element.style.background = "rgba(255, 77, 77, 0.2)";
        element.style.color = "var(--danger)";
      } else if (numValue > max) {
        element.textContent = "Acima do ideal";
        element.style.background = "rgba(255, 204, 0, 0.2)";
        element.style.color = "var(--warning)";
      } else {
        element.textContent = "Condição ideal";
        element.style.background = "rgba(75, 217, 111, 0.2)";
        element.style.color = "var(--success)";
      }
    }
    
    // Configurar intervalo para atualização de dados
    setInterval(simularDados, 5000);
    simularDados(); // Chamar imediatamente para preencher os dados
    
    // Event listeners para os controles
    document.querySelectorAll('.switch input').forEach(switchInput => {
      switchInput.addEventListener('change', function() {
        const controlName = this.id;
        const isOn = this.checked;
        console.log(`${controlName} ${isOn ? 'ativado' : 'desativado'}`);
        
        // Aqui você pode adicionar lógica para controlar dispositivos reais
        // Exemplo: fetch para API que controla os dispositivos físicos
      });
    });