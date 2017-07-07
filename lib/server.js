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

require('../route/hook-router.js')(state.app)
state.app.use((err, req, res, next) => {
  console.error(err)
  res.sendStatus(err.status ? err.status : 500)
})

module.exports = {
  start: () => new Promise((resolve, reject) => {
    if(state.isOn)
      return reject(new Error('server allready on'))
    state.http = state.app.listen(process.env.ROLLOUT_PORT, () => {
      debug(`server up :: ${process.env.ROLLOUT_PORT}`)
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
