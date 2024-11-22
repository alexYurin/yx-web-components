import { defineYxWebComponents, setTheme } from './core'

if (__NODE_ENV__ === 'development') {
  console.log(`App version: ${__APP_VERSION__}`)
  console.log(`Mode: ${__NODE_ENV__}`)
}

setTheme(__THEME__ || 'light')

defineYxWebComponents()
