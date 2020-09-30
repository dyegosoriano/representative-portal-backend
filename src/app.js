import { resolve } from 'path'
import express from 'express'
import cors from 'cors'

import loadRequest from './app/middleware/logRequest'
import routes from './routes'

import './database'

class App {
  constructor () {
    this.server = express()

    this.middleware()
    this.routes()
  }

  middleware () {
    this.server.use(cors())
    this.server.use(loadRequest)
    this.server.use(express.json())
    this.server.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')))
  }

  routes () {
    this.server.use(routes)
  }
}

export default new App().server
