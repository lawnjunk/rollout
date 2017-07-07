'use strict'

let {Router} = require('express')

module.exports = (opts) => {
  let result = new Router()
  //for(let method in opts){
  //}
  map(opts, (routes, method) => {
    map(routes, (handler, route) => {
      result[method](route, handler)
    })
  })
  return result
}
