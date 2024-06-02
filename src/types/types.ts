export const TYPES = {
  // Controllers
  UserController: Symbol.for('UserController'),
  SuperAdminController: Symbol.for('SuperAdminController'),
  // Services
  UserService: Symbol.for('UserService'),
  PermissionService: Symbol.for('PermissionService'),

  // Middlewares
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  CachingMiddleware: Symbol.for('CachingMiddleware'),
  PermissionMiddleware: Symbol.for('PermissionMiddleware'),
  IsSuperAdminMiddleware: Symbol.for('IsSuperAdminMiddleware')
}
