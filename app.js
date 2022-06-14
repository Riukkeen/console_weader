#!/usr/bin/env node
require('dotenv').config()
require('colors')
const { showMenu, pauseMenu } = require('./helpers/inquirer')

const Searches = require('./models/Searches')

console.clear()

const main = async () => {
  let option
  const searches = new Searches()
  do {
    const { option: selectedOption } = await showMenu()
    option = selectedOption

    switch (option) {
      case 1: {
        const cities = await searches.searchCity()
        const selectedCity = await searches.showCity(cities)
        if (selectedCity) {
          await searches.showWeather(selectedCity)
        }
        break
      }
    }

    // saveDb( services.list );

    if (option !== 0) await pauseMenu()
  } while (option !== 0)
}

main()
