document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '76ab49e2a4f67ce1d3a41591872f0dd6';
    const city = 'paris';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
                <p>${data.name}: ${data.weather[0].description}</p>
                <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});


