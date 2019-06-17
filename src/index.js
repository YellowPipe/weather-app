const apiCall = () => {
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.MY_API_KEY}`, {mode: 'cors'})
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      const weather = {
      	temp: response.main.temp,
      	description: response.weather[0].description,
      	icon: response.weather[0].icon
      }
      console.log(weather)
      return weather
    })
}
apiCall()