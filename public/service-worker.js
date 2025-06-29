self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
});

self.addEventListener('fetch', (event) => {
  // Intercepta requisições - não altera respostas ainda
  console.log('Requisição interceptada:', event.request.url);
});
