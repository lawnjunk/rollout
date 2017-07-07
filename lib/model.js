'use strict'

let uuid = require('uuid')
module.exports = (conf) => Object.assing({}, {id: uuid.v1, timestamp: Date.now()}, conf)
