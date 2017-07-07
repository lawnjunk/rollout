'use strict' 

const error = require('http-errors')

let state = {}

module.exports = {
  add: (event, repo, callback) => {
    state[event] = Object.assign({}, state[event], {[repo]: callback}) 
  }, 
  route: (event, repo) => {
    let callback = state[event] && state[event][repo]
    return callback ? callback : (req, res, next) =>  next(error(404, 'no hook found'))
  }
}

