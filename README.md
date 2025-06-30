# 🍓 **CYBER GLASSHOUSE: A Revolução da Hidroponia Automatizada** 🍓  

## 🌐 **Sobre o Site do Projeto**  
O **CYBER GLASSHOUSE** é o **painel de controle digital** da primeira estufa hidropônica 100% automatizada do **Projeto Agrinho**, desenvolvida pelo time de robótica educacional. Mais do que um site, é o **cérebro inteligente** que monitora e gerencia todo o cultivo sem solo.  

### **Funções Principais do Sistema**:  

### **1. Monitoramento Agro-Tecnológico**  
- 🌡️ **Temperatura em Tempo Real**  
  - Acompanhamento 24/7 com alertas para variações perigosas  
- 💧 **Umidade do Ar e Solução Nutritiva**  
  - Sensores IoT que previnem desidratação das plantas  
- ☀️ **Controle de Iluminação LED**  
  - Automatização do fotoperíodo (16h luz/8h escuro para morangos)  

### **2. Automação Hidropônica**  
| Sistema          | Tecnologia Usada               | Benefício                     |  
|------------------|-------------------------------|-------------------------------|  
| Bomba de Nutrientes | Arduino + Sensores pH/EC      | Dosagem perfeita de minerais  |  
| Esteira Transporte | Robótica LEGO EV3             | Movimento automático de bandejas |  
| Braço Colhedor   | Protótipo com Servomotores    | Colheita assistida por IA     |  

### **3. Painel de Controle Interativo**  
```mermaid  
graph TB  
    A[Sensor DHT11] --> B(Site CYBER GLASSHOUSE)  
    B --> C{Tomada de Decisão}  
    C -->|Umidade <60%| D[Ativa Nebulizadores]  
    C -->|Temperatura >28°C| E[Liga Ventilação]  
    C -->|Hora Programada| F[Aciona LEDs]  
```  

---  

## 🤖 **O Projeto de Robótica Parceiro**  
A **estufa física CYBER GLASSHOUSE** é um protótipo funcional desenvolvido para o **Desafio de Robótica Agrinho**, com:  

### **Tecnologias Implementadas**  
- **Estrutura Modular**  
  - Perfilados de alumínio e policarbonato  
  - Sistema NFT (Nutrient Film Technique) para morangos  

- **Hardware Inteligente**  
  - **ESP32** como cérebro principal  
  - Sensores **DS18B20** (temperatura solução) + **TDS Meter** (nutrientes)  



### **Resultados Alcançados**  
✅ **Redução de 90% no uso de água** vs agricultura tradicional  
✅ **Ciclo de colheita 30% mais rápido**  
✅ **App integrado** para controle por voz (Google Assistant)  
  

**"Onde os circuitos encontram as sementes, nasce a agricultura do futuro!"**  

*Projeto desenvolvido por [COLÉGIO ESTADUAL PROFESSORA MARIA LUIZA FRANCO PACHECO/LUAM, MATEUS, ALIANA, JOICE, GIOVANNA] para o Agrinho 2025 - Categoria Robótica Avançada e Programação.* 