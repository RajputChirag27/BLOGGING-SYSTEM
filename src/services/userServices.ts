import { injectable } from 'inversify'
import { UserInterface, UserServiceInterface } from '../interface'
import { User } from '../models/userModel'
import { CustomError, statusCode } from '../utils'
import messages from '../utils/messages'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { promisify } from 'util'


@injectable()
export class UserService implements UserServiceInterface {
  constructor() { }
  async getUsers() {
    return User.find()
  }

  async login(email, password) {
    const user : UserInterface = await User.findOne({ email: email });
    if (!user) {
      throw new CustomError(messages.INVALID_CREDENTIALS.name, statusCode.UNAUTHORIZED, messages.INVALID_CREDENTIALS.message);
    }
    const matchPasswords = await user.matchPasswords(password);
    if (!matchPasswords) {
      throw new CustomError(messages.INVALID_CREDENTIALS.name, statusCode.UNAUTHORIZED, messages.INVALID_CREDENTIALS.message
      );
    }
    if(user && matchPasswords){
      const token: string = await user.getSignedToken();
      return token;
    }
    return null;
  }

  async verifyUser(email, token) {
    const user: UserInterface = await User.findOne({ email: email });
    const secret: any = user.secret;
    const base32 = secret.base32;
    const verified = speakeasy.totp.verify({ token, encoding: 'base32', secret: base32 });
    if (verified) {
      return await user.getSignedToken()
    }
    return null;
  }

  async createUser(body) {
    // Generate the secret for the user
    body.secret = speakeasy.generateSecret({ length: 20 })
    const secret = body.secret

    // Create and save the user
    const user: UserInterface = new User(body)
    const result = await user.save()
    if (!user) {
      throw new CustomError(
        messages.User_Not_Created.name,
        statusCode.BAD_REQUEST,
        messages.User_Not_Created.message
      )
    }
    // // Generate the QR code
    // const QRCodeToDataURL = promisify(QRCode.toDataURL)
    // const image_data = await QRCodeToDataURL(secret.otpauth_url)

    const QRCodeToBuffer = promisify(QRCode.toBuffer)
    const qrBuffer = await QRCodeToBuffer(secret.otpauth_url)

    return qrBuffer
  }
}
