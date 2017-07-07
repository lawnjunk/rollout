'use strict'

let cors = require('cors')
let morgan = require('morgan')
let express = require('express')

let state = {
  app: express(),
  http: null,
  isOn: false,
}

state.app.use(cors())
state.app.use(morgan('dev'))
state.app.use(require('../route/hook-router.js'))

module.exports = {
  start: () => new Promise((resolve, reject) => {
    if(state.isOn)
      return reject(new Error('server allready on'))
    state.http = state.app.listen(process.env.PORT, () => {
      debug(`server up :: ${process.env.PORT}`)
      state.isOn = true
      resolve()
    })
  }),
  stop: () => new Promise((resolve, reject) => {
    if(!state.http || !state.isOn)
      return reject(new Error('server not yet on'))
    state.http.close(() => {
      debug(`server down`)
      state.isON = false
      resolve()
    })
  }),
}
