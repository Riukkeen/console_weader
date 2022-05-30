const inquirer = require('inquirer')
require('colors')

const questionPause = [
  {
    type: 'input',
    name: 'key',
    message: `Press ${'Enter'.blue} for continue`
  }
]

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'Select option',
    choices: [
      {
        value: 1,
        name: '1. Search city'
      },
      {
        value: 2,
        name: '2. History'
      },
      {
        value: 0,
        name: '0. Close'
      }
    ]
  }
]

const showMenu = async () => {
  console.clear()
  console.log(
    `
  =========================
           Weader
  =========================
  `.blue
  )

  const { option } = await inquirer.prompt(questions)
  return { option }
}

const pauseMenu = async () => {
  const { key } = await inquirer.prompt(questionPause)
  return key
}

const answerQuestion = async (question) => {
  const { key } = await inquirer.prompt([
    {
      type: 'input',
      name: 'key',
      message: question
    }
  ]
  )

  return { key }
}

const dynamicOptions = async (cities) => {
  const dynamicChoices = cities.map((city, index) => (
    {
      value: city.id,
      name: `${++index}. ${city.name}`
    }
  ))

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Select city:',
      choices: [
        ...dynamicChoices,
        {
          value: 0,
          name: '0. Cancel'
        }]
    }
  ])

  return { option }
}

module.exports = {
  showMenu,
  pauseMenu,
  answerQuestion,
  dynamicOptions
}
