import { injectable } from 'inversify'
import { UserInterface, UserServiceInterface } from '../interface'
import { User } from '../models/userModel'
import { CustomError, statusCode } from '../utils'
import messages from 'src/utils/messages'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { promisify } from 'util'

@injectable()
export class UserService implements UserServiceInterface {
  constructor() { }
  async getUsers() {
    return User.find()
  }
  async verifyUser(email, token) {
    console.log(token);
    const user = await User.findOne({ email: email });
    console.log(user);
    const secret : any = user.secret;
    console.log(secret);
    const base32 = secret.base32;
  
    // Adjust the window parameter if needed
    const verified = speakeasy.totp.verify({
      secret: base32,
      encoding: 'base32',
      token: token,
      window: 1 // Allow for a tolerance of 1 time step before and after the current time step
    });
  
    console.log(verified);
    if (!verified) {
      throw new CustomError("UserNotVerified", statusCode.FORBIDDEN, "User is not verified");
    }
    return user.getSignedToken();
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
