import express from 'express'
import 'express-async-errors'
import { resolve } from 'path'
import cors from 'cors'

import errorHandling from '@middleware/errorHandling'
import logRequest from '@middleware/logRequest'
import routes from './routes'

import './database'

class App {
  server = express.application

  constructor() {
    this.server = express()

    this.middleware()
    this.routes()
    this.errors()
  }

  middleware(): void {
    this.server.use(cors())
    this.server.use(logRequest)
    this.server.use(express.json())
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads')),
    )
  }

  routes(): void {
    this.server.use(routes)
  }

  errors(): void {
    this.server.use(errorHandling.notFound)
    this.server.use(errorHandling.globalErrors)
  }
}

export default new App().server
