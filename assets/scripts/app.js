const apiKey = config.apiKey;
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const temperature = document.querySelector('.temp');
const cityName = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');
const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const weatherDiv = document.querySelector('.weather');
const errorDiv = document.querySelector('.error');
const loadingDiv = document.querySelector('.loading');

function checkWeather() {
  if (searchInput.value.trim() === '') {
    alert('Please enter the city name.');
    return;
  }

  try {
    loadingDiv.style.display = 'block';
    weatherDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    setTimeout(async function () {
      const response = await fetch(
        `${apiUrl}${searchInput.value}&appid=${apiKey}`
      );
      if (response.status === 404) {
        errorDiv.style.display = 'block';
        loadingDiv.style.display = 'none';
        weatherDiv.style.display = 'none';
        return;
      }
      const data = await response.json();
      temperature.textContent = `${Math.round(data.main.temp)}°c`;
      cityName.textContent = data.name;
      humidity.textContent = `${data.main.humidity}%`;
      wind.textContent = `${data.wind.speed}km/h`;
      // if (data.weather[0].main != null) {
      //   weatherIcon.src = `assets/images/(${data.weather[0].main.toLowerCase()}).png`;
      // } else {
      //   weatherIcon.src = 'assets/images/clouds.png';
      // }

      switch (data.weather[0].main) {
        case 'Clouds':
          weatherIcon.src = 'assets/images/clouds.png';
          break;
        case 'Clear':
          weatherIcon.src = 'assets/images/clear.png';
          break;
        case 'Rain':
          weatherIcon.src = 'assets/images/rain.png';
          break;
        case 'Drizzle':
          weatherIcon.src = 'assets/images/drizzle.png';
          break;
        case 'Mist':
          weatherIcon.src = 'assets/images/mist.png';
          break;
        default:
          weatherIcon.src = 'assets/images/clouds.png';
          break;
      }

      loadingDiv.style.display = 'none';
      errorDiv.style.display = 'none';
      weatherDiv.style.display = 'block';
    }, 1500);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

searchButton.addEventListener('click', checkWeather);

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkWeather();
  }
});
