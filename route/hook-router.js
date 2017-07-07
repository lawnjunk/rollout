'use strict'

const fs = require('fs-extra')
const jsonParser = require('body-parser').json()
const execTasks = require('../lib/exec-tasks.js')
const hookRouter = require('../lib/hook-router.js')

let TASK_DIR = `${__dirname}/../task`

fs.readdir(TASK_DIR)
.then(repos => 
  Promise.all(repos.map(repo => 
    fs.readdir(`${TASK_DIR}/${repo}`)
    .then(hooks => ({ repo, hooks })))))
.then(tasks => {
  tasks.forEach(task => {
    task.hooks.forEach(hook => {
      hookRouter.add(hook, task.repo, (req, res, next) => {
        execTasks(hook, task.repo) 
        .then(results => res.json(results))
        .catch(next)
      })
    })
  })
})

module.exports = (app) => {
  app.post('/hook/:repo', jsonParser, (req, res, next) => {
    let event = req.headers['x-github-event']
    hookRouter.route(event, req.params.repo)(req, res, next)
  })
}
