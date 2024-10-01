window.onload = function() {
  // Função para pegar a hora local e definir a saudação
  function getGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greetingMessage;

    if (hours >= 5 && hours < 12) {
      greetingMessage = 'Bom dia!';
    } else if (hours >= 12 && hours < 18) {
      greetingMessage = 'Boa tarde!';
    } else {
      greetingMessage = 'Boa noite!';
    }

    document.getElementById('greeting').textContent = greetingMessage;
  }

  // Função para pegar a localização do usuário
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.getElementById('location').textContent = "Geolocalização não é suportada pelo navegador.";
    }
  }

  // Função para exibir a posição
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Usando uma API de localização (por exemplo, OpenCage ou outra gratuita)
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('location').textContent = `Um grande abraço para o pessoal de ${data.city}, ${data.countryName}!`;
      })
      .catch(error => {
        document.getElementById('location').textContent = "Não foi possível detectar sua localização.";
      });
  }

  // Função para tratar erros de geolocalização
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById('location').textContent = "Permissão de localização negada.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById('location').textContent = "Localização indisponível.";
        break;
      case error.TIMEOUT:
        document.getElementById('location').textContent = "Solicitação de localização expirou.";
        break;
      case error.UNKNOWN_ERROR:
        document.getElementById('location').textContent = "Erro desconhecido.";
        break;
    }
  }

  // Chama as funções ao carregar a página
  getGreeting();
  getLocation();
}
