'use strict'

const router = require('../lib/router.js')
const bodyParser = require('bodyParser')



module.exports = router({
  get: {
    '/hook/:repository': (req, res, next) => {
      res.json({cool: 'beans'})
    },
  },
})

