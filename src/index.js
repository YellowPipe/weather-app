import './scss/index.scss';

const apiCall = async (city, unit) => {
	try {
		const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=${process.env.MY_API_KEY}`, {mode: 'cors'})
		const data = await resp.json()
		const weather = {
			city: data.name,
	      	temp: Math.round(data.main.temp),
	      	description: data.weather[0].description,
	      	wind: data.wind.speed,
	      	iconId: data.weather[0].icon
	    }
		displayWeather(weather)
	} catch(err) {
		handleError()
	}
}


const metric = {
	system: "metric",
	icon: "C",
	name: 'Celcius'
}

const imperial = {
	system: "imperial",
	icon: "F",
	name: 'Fahrenheit'
}

let currentUnit = metric

const handleError = () => {
	const city = document.getElementById('cityName')
	const temp = document.getElementById('temp')
	const description = document.getElementById('desc')
	const wind = document.getElementById("wind")
	city.textContent = 'City not found'
	img.src = ''
	temp.textContent = null
	description.textContent = null
	wind.textContent = null
}

const getWeather = () => {
	const city = document.getElementById('city').value
	apiCall(city, currentUnit.system )
}

const displayWeather = (weather) => {
	const weatherData = document.getElementById('weatherData')
	const temp = document.getElementById('temp')
	const city = document.getElementById('cityName')
	const description = document.getElementById('desc')
	const wind = document.getElementById("wind")
	const img = document.getElementById('img')
	img.src = `http://openweathermap.org/img/w/${weather.iconId}.png`
	temp.innerHTML = `${weather.temp} &#176${currentUnit.icon}`
	description.textContent = weather.description
	wind.textContent = `Wind: ${weather.wind} m/s`
	cityName.textContent = weather.city
}

const switchUnitButton = document.getElementById('unitSwitch')

const switchUnits = () => {
	if (currentUnit === metric) {
		currentUnit = imperial
		switchUnitButton.textContent = currentUnit.name
		switchUnitButton.classList.remove("btn-info")
		switchUnitButton.classList.add("btn-primary")
	} else {
		currentUnit = metric
		switchUnitButton.textContent = currentUnit.name
		switchUnitButton.classList.remove("btn-primary")
		switchUnitButton.classList.add("btn-info")
	}
}

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => { getWeather() })
switchUnitButton.addEventListener('click', () => { switchUnits() })

