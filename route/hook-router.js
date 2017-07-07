'use strict'

const fs = require('fs-extra')
const jsonParser = require('body-parser').json()
const execTasks = require('../lib/exec-tasks.js')
const hookRouter = require('../lib/hook-router.js')

let TASK_DIR = `${__dirname}/../task`

hookRouter.add('push', 'example', (req, res, next) => {
  console.log(':issess:slugbyte req.body', req.body)
  execTasks('push', 'example')
  .then(results => res.json(results))
  .catch(next)
})

hookRouter.add('push', 'slugbyte', (req, res, next) => {
  res.send({msg: 'lulwat boooyea'})
})


TASK_DIR = '/Users/slugbyte/gitz/workspace/rollout/task' 

fs.readdir(TASK_DIR).then(console.log)

//
  //return Promise.all(repos.map(repo => 
    //fs.readdir(`${TASK_DIR}/${repo}`)
    //.then(hooks => {
      //return { repo, hooks }
    //})))


module.exports = (app) => {
  app.post('/hook/:repo', jsonParser, (req, res, next) => {
    let event = req.headers['x-github-event']
    hookRouter.route(event, req.params.repo)(req, res, next)
  })
}
