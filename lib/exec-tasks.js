'use strict'

const fs = require('fs-extra')
const childProcess = require('child_process')

let execFile = (...args) => new Promise((resolve, reject) => {
  childProcess.execFile(...args, (err, stdout, stderr) => {
    if(err)
      return reject(err)
    resolve({path: args[0], stdout, stderr})
  })
})


module.exports = (event, repo) => {
  return fs.readdir(`${__dirname}/../task/${repo}/${event}`)
  .then(scripts => Promise.all(scripts.map(path => {
    return execFile(`${__dirname}/../task/${repo}/${event}/${path}`)
  })))
}
