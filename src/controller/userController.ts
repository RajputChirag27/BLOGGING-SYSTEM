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
import { permission } from 'process'
import { userSchema } from '../validations'

@controller('/user', moduleType('users'))
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {}

  @httpGet('/deleted')
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getDeletedUsers()
      res.send(result)
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpGet(
    '/all',
    TYPES.AuthMiddleware,
    TYPES.PermissionMiddleware,
    TYPES.CachingMiddleware
  )
  public async getAllUsers(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const permissions = req.permission
      const query = req.query
      console.log('permissions : ' + permissions)
      // console.log(query);
      const result = await this.userService.getAllUsers(permissions, query)
      res.send(result)
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpGet(
    '/protected',
    TYPES.AuthMiddleware,
    TYPES.PermissionMiddleware,
    TYPES.CachingMiddleware
  )
  public async protected(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // console.log(req.permission)
      const permissions = req.permission
      console.log(permissions)
      res.send({
        message: 'This is protected Route',
        permissions,
        isAuthorized: true
      })
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpPost('/')
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username, email, role, password, profilePicture } = req.body
      console.log({ username, email, role, password, profilePicture })
      const body = { username, email, role, password, profilePicture }
      const validatedBody = await userSchema.validate(body)

      const qrBuffer = await this.userService.createUser(validatedBody)
      res.contentType('image/png')
      res.send(qrBuffer)
    } catch (err) {
      console.error('Error in createUser:', err)
      if (!res.headersSent) {
        errorHandler(req, res, next, err)
      }
    }
  }

  @httpPost('/login')
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const jwtToken = await this.userService.login(email, password)
      req.headers.authorization = `Bearer ${jwtToken}`
      if (jwtToken) res.send({ jwtToken, verified: true })
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpPost('/verify')
  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, token } = req.body
      const jwtToken = await this.userService.verifyUser(email, token)
      if (jwtToken) {
        res.send({ jwtToken, verified: true })
      } else {
        throw new CustomError(
          'InvalidToken',
          statusCode.NOT_FOUND,
          'Token is invalid'
        )
      }
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpPost('/checkIfExpired')
  public async generateTokenFromRefreshToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      // console.log(token)
      function isTokenExpired(token) {
        // const payloadBase64 = token.split('.')[1];
        const decodedJson = Buffer.from(token, 'base64').toString()
        console.log(decodedJson)
        const decoded = JSON.parse(decodedJson)
        console.log(decoded)
        const exp = decoded.exp
        const expired = Date.now() >= exp * 1000
        return expired
      }

      if (!isTokenExpired) {
        throw new CustomError(
          'InvalidToken',
          statusCode.NOT_FOUND,
          'Token not found'
        )
      }
      res.send(new ApiHandler(isTokenExpired))
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpPut('/:id', TYPES.AuthMiddleware)
  public async userUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body
      const idFromToken = req.user.id
      const idFromRequest = req.params.id
      console.log(idFromToken, idFromRequest)
      const result = await this.userService.updateUserbyId(
        body,
        idFromRequest,
        idFromToken
      )
      res.send({ result, isAuthorized: true })
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpDelete('/:id', TYPES.AuthMiddleware)
  public async userDelete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const idFromToken = req.user.id
      const idFromRequest = req.params.id
      console.log(idFromToken, idFromRequest)
      const result = await this.userService.deleteUserbyId(
        idFromRequest,
        idFromToken
      )
      res.send({ result, isAuthorized: true })
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }
}
