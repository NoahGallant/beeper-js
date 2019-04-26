#!/usr/bin/env node

const path = require('path')
const budo = require('budo')
const express = require('express')
const dbGateway = require('./dbGateway')
const redirectToHttps = require('./middleware/redirectToHttps')
const periodicRestart = require('./periodicRestart')
const csp = require('./csp')

require('events').prototype._maxListeners = 100

process.chdir(path.resolve(__dirname, '..'))

const router = express.Router()

function serveIndex (req, res, next) {
  req.url = '/'
  next()
}

router.get('/', csp, serveIndex)

const attachWebsocket = dbGateway(router)

function runBudo () {
  const port = process.env.PORT || 5000
  const devServer = budo('index.js', {
    port,
    browserify: {
      transform: [
        'brfs'
      ]
    },
    middleware: [
      redirectToHttps
    ],
    dir: ['.', 'static', '.data'],
    staticOptions: {
      cacheControl: true,
      maxAge: 60 * 60 * 1000 // one hour
    }
    /*
    stream: process.stdout,
    verbose: true
    */
  })
  devServer.on('connect', event => {
    console.log('Listening on', event.uri)
    attachWebsocket(event.server)
    periodicRestart(24 * 60) // Daily
  })
}

runBudo()
