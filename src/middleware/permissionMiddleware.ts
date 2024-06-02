import { BaseMiddleware } from 'inversify-express-utils'
import { CustomError } from '../utils'
import { NextFunction, Response } from 'express'
import { AuthRequest } from '../interface'
import { errorHandler } from '../handler/errorHandler'
import { TYPES } from '../types'
import { inject } from 'inversify'
import { PermissionService } from '../services'
import { permission } from 'process'

interface Permission {
  read: boolean
  write: boolean
  update: boolean
  delete: boolean
  roleName: string
}

interface User {
  permissions: Permission[]
}

export class PermissionMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.PermissionService)
    private readonly permissionService: PermissionService
  ) {
    super()
  }
  async handler(req: AuthRequest, res: Response, next: NextFunction) {
    const moduleName = req.headers.module as string
    const role: string = req.user.role
    console.log(moduleName)
    console.log(role)
    const permissions: Permission[] =
      await this.permissionService.getPermissions(moduleName, role)
    const permission = permissions[0]
    req.permission = permission

    // console.log(permission);

    // permit(permission);

    next()

    // console.log(permissions)

    // next();
  }
}
