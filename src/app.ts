import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as appConfig from './config'
import express from 'express'
import { CachingMiddleware } from './middleware'
import { TYPES } from './types'

appConfig.dbConfig

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

// Set views directory (optional, EJS looks in 'views' directory by default)
app.set('views', __dirname + '/view')
// Middlewares
app.use(express.json())
app.use(express.static('public'))
// const cachingMiddleware = appConfig.container.get<CachingMiddleware>(TYPES.CachingMiddleware);
// app.use(cachingMiddleware.handler.bind(cachingMiddleware));

let server = new InversifyExpressServer(appConfig.container, null, null, app)

const configuredApp = server.build()

configuredApp.listen(port, () => {
  console.log('App is listening on port ' + port)
})
