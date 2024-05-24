import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as appConfig from '@config'
import express from 'express'


appConfig.dbConfig



const app = express();
const port = process.env.PORT || 3000
// Middlewares
app.use(express.json())


let server = new InversifyExpressServer(appConfig.container, null, null, app);

const configuredApp = server.build();


configuredApp.listen(port, () => {
    console.log('App is listening on port ' + port);
})