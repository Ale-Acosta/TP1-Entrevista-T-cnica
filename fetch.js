const climaApiKey = 'd7d4805abce9f77e483aabc52d11976b';
const mapApiKey = 'AIzaSyADlPJMEYHd9mYmI_9CMSvcXm-4bu6WtUo';
const inputBusqueda = document.getElementById('inputBusqueda');
const datosClima = document.getElementById('datosClima');
const mapElement = document.getElementById('map');

// Función para buscar el clima y el mapa
function buscarClima() {
  const ciudad = inputBusqueda.value;

  // Hace petición de OpenWeather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${climaApiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      // Obtengo coordenadas de localización
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=10&size=800x600&key=${mapApiKey}`;
      mapElement.innerHTML = ``;
      
      // Guarda los datos del clima en localStorage
      localStorage.setItem('ultimaBusqueda', JSON.stringify(data));

      // Muestra los datos del clima
      const informacionClima = `
             
      <div class= "row">
        <div class="card col-6 p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3  shadow-lg" >
          
            <img class = "icono" src=" ${getWeatherImage(data.weather[0].icon)}" alt="Icono Clima">
            <div class="card-body ">
                <h2 class="card-title">Clima en ${data.name}</h2>
                <span>${Math.round(data.main.temp)}°C</span>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Temperatura Máxima: ${Math.round(data.main.temp_max)}°C</li>
                <li class="list-group-item">Temperatura Mínima: ${Math.round(data.main.temp_min)}°C</li>
                <li class="list-group-item">Humedad: ${data.main.humidity}%</li>
                <li class="list-group-item">Sensación Térmica: ${Math.round(data.main.feels_like)}°C</li>
                <li class="list-group-item">Presión Atmosférica: ${data.main.pressure} hPa</li>
                <li class="list-group-item">Velocidad del Viento: ${data.wind.speed} m/s</li>
            </ul>         
        </div>
        <div class= "col-6 ">
        <img  src="${mapUrl}" alt="Mapa de ${data.name}">        </div>
      </div>
      `;
      datosClima.innerHTML = informacionClima;
    })
    .catch(error => {
      console.error('Error al obtener el clima:', error);
      datosClima.innerHTML = '<p>No se pudo obtener el clima.</p>';
    });
}

// Trae la imagen del clima
function getWeatherImage(iconCode) {
  return `https://openweathermap.org/img/w/${iconCode}.png`;
}

// Verifica si hay datos  en localStorage 
window.addEventListener('load', () => {
  const ultimaBusqueda = localStorage.getItem('ultimaBusqueda');
  if (ultimaBusqueda) {
    const data = JSON.parse(ultimaBusqueda);
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=10&size=800x600&key=${mapApiKey}`;
    mapElement.innerHTML = ``;

    const informacionClima = `
    <div class= "row">
    <div class="card col-6  pb-0  pt-lg-5 align-items-center rounded-3  shadow-lg" >
      
        <img class = "icono" src=" ${getWeatherImage(data.weather[0].icon)}" alt="Icono Clima">
        <div class="card-body ">
            <h2 class="card-title">Clima en ${data.name}</h2>
            <span>${Math.round(data.main.temp)}°C</span>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Temperatura Máxima: ${Math.round(data.main.temp_max)}°C</li>
            <li class="list-group-item">Temperatura Mínima: ${Math.round(data.main.temp_min)}°C</li>
            <li class="list-group-item">Humedad: ${data.main.humidity}%</li>
            <li class="list-group-item">Sensación Térmica: ${Math.round(data.main.feels_like)}°C</li>
            <li class="list-group-item">Presión Atmosférica: ${data.main.pressure} hPa</li>
            <li class="list-group-item">Velocidad del Viento: ${data.wind.speed} m/s</li>
        </ul>
    </div>
    <div class= "col-6 ">
    <img  src="${mapUrl}" alt="Mapa de ${data.name}">        </div>
  </div>
    `;
    datosClima.innerHTML = informacionClima;

  }
});

  