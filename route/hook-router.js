'use strict'

const jsonParser = require('body-parser').json()

module.exports = (app) => {
  app.post('/hook/:repo', jsonParser, (req, res, next) => {
    console.log('url', req.url, '\n')
    console.log('params', req.params, '\n')
    console.log('headers', req.headers, '\n')
    console.log('query', req.query, '\n')
    console.log('body', req.body, '\n')
    res.json({msg: 'hello world'})
  })
}


