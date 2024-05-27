import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { TYPES } from '../types'
import { promisify } from 'util'
import { UserService } from '../services/userServices'
import { Request, Response, NextFunction } from 'express'
import { errorHandler } from '../handler/errorHandler'
import QRCode from 'qrcode'
import speakeasy from 'speakeasy'
import { User } from 'src/models/userModel'
import { CustomError } from '../utils'
import fs from 'fs'

@controller('/user')
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService
  ) { }
  @httpGet('/')
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getUsers()
      res.send(result)
    } catch (err) {
      errorHandler(req, res, next, err)
    }
  }

  @httpGet('/viewQr')
  public async viewQr(req: Request, res: Response, next: NextFunction) {
    try {
      // Retrieve the QR code data from the query parameter
      const qrCode = req.query.qrCode;

      // Render the EJS template with the QR code data
      res.render('qrcode', { qrCode });

    } catch (err) {
      console.error('Error in viewQr:', err);
      if (!res.headersSent) {
        errorHandler(req, res, next, err);
      }
    }
  }

  @httpPost('/')
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Generate the secret for the user
      req.body.secret = speakeasy.generateSecret({ length: 20 })
      const secret = req.body.secret

      // Create and save the user
      const user = new User(req.body)
      const result = await user.save()

      // // Generate the QR code
      // const QRCodeToDataURL = promisify(QRCode.toDataURL)
      // const image_data = await QRCodeToDataURL(secret.otpauth_url)

      const QRCodeToBuffer = promisify(QRCode.toBuffer);
      const qrBuffer = await QRCodeToBuffer(secret.otpauth_url);

      // res.send(image_data);
      // res.contentType('text/html');

      // const image = `
      // <img src="${image_data}" type="base64">
      // `
      res.contentType('image/png');
      
      res.send(qrBuffer);
      // Send the response with the user and QR code
      // res.status(200).json({
      //   user: result,
      //   qrCode: image_data
      // })


    } catch (err) {
      console.error('Error in createUser:', err)
      if (!res.headersSent) {
        errorHandler(req, res, next, err)
      }
    }
  }


  
}
