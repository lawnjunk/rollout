'use strict'

let model = require('../lib/model.js')

module.exports = {
  create = (_) => model({
    repository: _.repository,
    type: _.type,
  }),
}
