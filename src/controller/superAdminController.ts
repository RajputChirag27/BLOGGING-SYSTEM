import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
  next
} from 'inversify-express-utils'
import { NextFunction, Request, Response } from 'express'
import { PermissionService, UserService } from '../services/'
import { inject } from 'inversify'
import { UserInterface } from '../interface'
import dotenv from 'dotenv'

import { AuthMiddleware } from '../middleware'
import { errorHandler } from '../handler/errorHandler'
import { ApiHandler } from '../utils'
import { TYPES } from '../types'
import { RoleInterface } from '../models/roleModel'
dotenv.config()

@controller('/superadmin', TYPES.AuthMiddleware,TYPES.IsSuperAdminMiddleware)
export class SuperAdminController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.PermissionService)
    private readonly permissionService: PermissionService
  ) {}
  @httpPost('/roles')
  async assignRole(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const role = req.body.role
      console.log(role)
      const roles = await this.userService.assignRoles(role)
      res.send(new ApiHandler(roles))
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpPost('/model')
  async addModel(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const name = req.body.name
      const moduleName = await this.userService.addModel(name)
      res.send(new ApiHandler(moduleName))
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpPost('/permission')
  async addPermissions(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const { name, role, read, write, update, delete: del } = req.body // Note the alias `delete` to `del`
      const sanitizedBody = {
        name,
        role,
        read,
        write,
        update,
        delete: del
      }
      const permissionName =
        await this.permissionService.addPermissions(sanitizedBody)
      res.send(new ApiHandler(permissionName))
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }
}
