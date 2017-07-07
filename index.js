'use strict'
require('dotenv').config({path: `${__dirname}/.dev.env`})
require('./lib/globals.js')
require('./lib/server.js').start()
