import './scss/index.scss';

const apiCall = async (city, unit) => {
	try {
		const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=${process.env.MY_API_KEY}`, {mode: 'cors'})
		const data = await resp.json()
		const weather = {
			city: data.name,
	      	temp: Math.round(data.main.temp),
	      	description: data.weather[0].description,
	      	iconId: data.weather[0].icon
	    }
		displayWeather(weather)
	} catch(err) {
		handleError()
	}
}


const metric = {
	name: "metric",
	icon: "C"
}

const imperial = {
	name: "imperial",
	icon: "K"
}

let currentUnit = metric

const handleError = () => {
	const city = document.getElementById('cityName')
	city.textContent = 'City not found'
}

const getWeather = () => {
	const city = document.getElementById('city').value
	apiCall(city, currentUnit.name)
}

const displayWeather = (weather) => {
	const weatherData = document.getElementById('weatherData')
	// weatherData.innerHTML = null
	console.log(weather)
	const temp = document.getElementById('temp')
	const city = document.getElementById('cityName')
	const description = document.getElementById('desc')
	// const imgP = document.getElementById("img")
	const img = document.getElementById('img')
	img.src = `http://openweathermap.org/img/w/${weather.iconId}.png`
	temp.textContent = weather.temp + currentUnit.icon
	description.textContent = weather.description
	cityName.textContent = weather.city
	// weatherData.appendChild(city)
	// weatherData.appendChild(temp)
	// weatherData.appendChild(description)
	// imgP.appendChild(img)
}

const switchUnitButton = document.getElementById('unitSwitch')

const switchUnits = () => {
	if (currentUnit = metric) {
		currentUnit = imperial
		switchUnitButton.textContent = "Switch to Celcius"
	} else {
		currentUnit = metric
		switchUnitButton.textContent = "Switch to Fahrenheit"
	}
}

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => { getWeather() })
switchUnitButton.addEventListener('click', () => { switchUnits() })

