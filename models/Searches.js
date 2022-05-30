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

  async showCity () {
    try {
      const cities = await this.searchCity()
      const { option: idSelectedCity } = await dynamicOptions(cities)

      if (idSelectedCity === 0) return

      const selectedCity = cities.find(city => city.id === idSelectedCity)

      console.log('\nInfo city\n'.green)
      console.log(`${'City'.green}: ${selectedCity.name}`)
      console.log(`${'Latitude'.green}: ${selectedCity.name}`)
      console.log(`${'Longitude:'.green} ${selectedCity.name}`)
      console.log('\n')
    } catch (err) {
      console.log(err)
    }
  }

  async searchCity () {
    const { key: city } = await answerQuestion('Write city\'s name:')

    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?`,
        params: this.paramsMapBox
      })

      const { data } = await instance.get()

      return data.features.map(city => ({
        id: city.id,
        name: city.place_name,
        lng: city.center[0],
        lat: city.center[1]
      }))
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Searches
