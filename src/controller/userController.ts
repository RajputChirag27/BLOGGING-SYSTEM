import {
  controller,
  httpGet,
  httpPost,
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { TYPES } from '../types'
import { UserService } from '../services/userServices'
import { Request, Response, NextFunction } from 'express'
import { errorHandler } from '../handler/errorHandler'
import { CustomError, statusCode } from '../utils'



@controller('/user')
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {}
  @httpGet('/')
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getUsers()
      res.send(result)
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpPost('/verify')
  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
     const {email,token} = req.body;
     const result = await this.userService.verifyUser(email,token)
     if(result){
       res.send({result,verified : true})
     } else{
      throw new CustomError("InvalidToken", statusCode.NOT_FOUND, "Token is invalid")
     }
    } catch (err) {
        errorHandler(req, res, next, err)
    }
  }

  @httpPost('/')
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const qrBuffer = await this.userService.createUser(req.body)
      res.contentType('image/png')
      res.send(qrBuffer)
    } catch (err) {
      console.error('Error in createUser:', err)
      if (!res.headersSent) {
        errorHandler(req, res, next, err)
      }
    }
  }
}
