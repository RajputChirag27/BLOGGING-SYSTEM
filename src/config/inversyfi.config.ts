import { Container } from 'inversify'
import { TYPES } from '../types'
import { UserService } from '../services/userServices'
import { UserController } from '../controller/userController'

const container = new Container()

container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<UserController>(TYPES.UserController).to(UserController)

export default container
