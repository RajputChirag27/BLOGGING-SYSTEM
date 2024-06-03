import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { TYPES } from '../types'
import { UserService } from '../services/'
import { Request, Response, NextFunction } from 'express'
import { errorHandler } from '../handler/errorHandler'
import { ApiHandler, CustomError, statusCode } from '../utils'
import { AuthRequest } from '../interface'
import { moduleType } from '../utils'

@controller('/blogpost', moduleType('users'))
export class BlogpostController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {}
}
