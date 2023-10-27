const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-bar');
const notFind = document.querySelector('.not-find h1');
const weatherMain = document.querySelector('.weather-main');
const weatherDetails = document.querySelector('.weather-details');

searchButton.addEventListener('click', () => {
	const API_KEY = '0dbf7aacee3945c235261bca89fc6354';

	const searchValue = searchInput.value;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}`;

	if (searchValue === '') return;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.cod === '404') {
				notFind.innerHTML = data.message;
				container.style.height = '150px';
				weatherMain.style.display = 'none';
				weatherDetails.style.display = 'none';
				notFind.style.display = 'block';
				return;
			}
			notFind.style.display = 'none';
			weatherMain.style.display = 'block';
			weatherDetails.style.display = 'flex';

			const image = document.querySelector('.weather-main img');
			const temperature = document.querySelector('.temperature');
			const desc = document.querySelector('.desc');
			const city = document.querySelector('.city');
			const country = document.querySelector('.country');
			const humidity = document.querySelector('.weather-humidity .text span');
			const wind = document.querySelector('.weather-wind .text span');

			switch (data.weather[0].main) {
				case 'Clear':
					image.src = 'images/clear.png';
					break;

				case 'Clouds':
					image.src = 'images/clouds.png';
					break;

				case 'Rain':
					image.src = 'images/rain.png';
					break;

				case 'Haze':
					image.src = 'images/mist.png';
					break;

				case 'Snow':
					image.src = 'images/snow.png';
					break;

				case 'Drizzle':
					image.src = 'images/drizzle.png';
					break;

				default:
					image.src = '';
			}

			container.style.height = '560px';
			city.innerHTML = `${data.name}`;
			country.innerHTML = `${data.sys.country}`;
			temperature.innerHTML = `${Number(data.main.temp).toFixed(0) / 10}°C`;
			desc.innerHTML = `${data.weather[0].description}`;
			humidity.innerHTML = `${data.main.humidity}%`;
			wind.innerHTML = `${Number(data.wind.speed)}km/h`;
		});
});
