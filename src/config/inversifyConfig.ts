import { Container } from 'inversify'
import { TYPES } from '../types'
import { PermissionService, UserService } from '../services'
import { UserController, SuperAdminController } from '../controller'
import { AuthMiddleware } from '../middleware/auth'
import { CachingMiddleware } from '../middleware'
import { PermissionMiddleware } from '../middleware/permissionMiddleware'

const container = new Container()

//Controllers
container.bind<UserController>(TYPES.UserController).to(UserController)
container
  .bind<SuperAdminController>(TYPES.SuperAdminController)
  .to(SuperAdminController)

//Services
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<PermissionService>(TYPES.PermissionService).to(PermissionService)

// Middlewares
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<CachingMiddleware>(TYPES.CachingMiddleware).to(CachingMiddleware)
container
  .bind<PermissionMiddleware>(TYPES.PermissionMiddleware)
  .to(PermissionMiddleware)

export default container
