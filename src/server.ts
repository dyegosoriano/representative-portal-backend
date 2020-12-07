import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import 'express-async-errors'
import 'reflect-metadata'
import './database'

import errorHandling from '@middleware/errorHandling'
import logRequest from '@middleware/logRequest'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())
app.use(logRequest)
app.use(routes)

app.use(errorHandling.notFound)
app.use(errorHandling.globalErrors)

app.listen(port, () => console.log(`🚀  Server is running port: ${port}`))
