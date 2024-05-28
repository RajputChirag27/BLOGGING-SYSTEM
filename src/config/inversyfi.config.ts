import { Container } from 'inversify'
import { TYPES } from '../types'
import { UserService } from '../services/userServices'
import { UserController } from '../controller/userController'
import { AuthMiddleware } from '../middleware/auth'

const container = new Container()

container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<UserController>(TYPES.UserController).to(UserController)


container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

export default container
