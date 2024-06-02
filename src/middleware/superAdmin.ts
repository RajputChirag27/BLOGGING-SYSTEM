import { injectable } from 'inversify'
import { NextFunction, Response } from 'express'
import { AuthRequest } from '../interface'
import { BaseMiddleware } from 'inversify-express-utils'
import { errorHandler } from '../handler/errorHandler'
import { Role } from '../models'
import { statusCode } from '../utils'
import messages from '../utils/messages'

@injectable()
export class IsSuperAdminMiddleware extends BaseMiddleware {
  async handler(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const user: User = await UserModel.findOne({ email: req.user.email });
      const user = req.user
      const role = await Role.findById(user.role)
      if (!user || role.role !== 'superadmin') {
        const err = {
          name: 'ForbiddenError',
          statusCode: statusCode.UNAUTHORIZED,
          message : "UnAuthorized User"
        }
        errorHandler(req, res, next, err)
      } else {
        next()
      }
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }
}
