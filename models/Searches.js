const { answerQuestion, dynamicOptions } = require('../helpers/inquirer')
const axios = require('axios')

class Searches {
  get paramsMapBox () {
    return {
      proximity: 'ip',
      language: 'en',
      limit: 5,
      access_token: process.env.MAPBOX_KEY
    }
  }

  paramsOpenWeatherMap (lat, long) {
    return {
      lat,
      lon: long,
      lang: 'en',
      units: 'metric',
      appid: process.env.OPENWEATHERMAP_KEY
    }
  }

  async showCity (cities) {
    try {
      const { option: idSelectedCity } = await dynamicOptions(cities)

      if (idSelectedCity === 0) return

      const selectedCity = cities.find((city) => city.id === idSelectedCity)

      console.log('\nInfo city\n'.green)
      console.log(`${'City'.green}: ${selectedCity.name}`)
      console.log(`${'Latitude'.green}: ${selectedCity.lat}`)
      console.log(`${'Longitude:'.green} ${selectedCity.lng}`)
      console.log('\n')

      return selectedCity
    } catch (err) {
      console.log(err)
    }
  }

  async searchCity () {
    const { key: city } = await answerQuestion("Write city's name:")

    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?`,
        params: this.paramsMapBox
      })

      const { data } = await instance.get()

      return data.features.map((city) => ({
        id: city.id,
        name: city.place_name,
        lng: city.center[0],
        lat: city.center[1]
      }))
    } catch (err) {
      console.log(err)
    }
  }

  async showWeather (city) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
        params: this.paramsOpenWeatherMap(city.lat, city.lng)
      })
      const { data } = await instance.get()

      console.log('Info weather\n'.green)
      console.log(`${'Temperature'.green}: ${data.main.temp}`)
      console.log(`${'Humidity'.green}: ${data.main.humidity}`)
      console.log(`${'Min:'.green} ${data.main.temp_min}`)
      console.log(`${'Max:'.green} ${data.main.temp_max}`)
      console.log('\n')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Searches
