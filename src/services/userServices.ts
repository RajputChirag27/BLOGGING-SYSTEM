import { injectable } from 'inversify'
import { UserInterface, UserServiceInterface } from '../interface'
import { User } from '../models/userModel'
import { CustomError, statusCode } from '../utils'
import messages from '../utils/messages'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { promisify } from 'util'
import { PipelineStage } from 'mongoose'

@injectable()
export class UserService implements UserServiceInterface {
  constructor() { }
  async getUsers() {
    return await User.find({isDeleted : false});
  }

  async getDeletedUsers() {
    return await User.find({isDeleted : true});
  }

  async getAllUsers(permission, queries) {

    // const queryObject = {...query};

    // queryObject.remove

    // const queryString = queryString.

    // const pipeline : PipelineStage[] = []

    // const userPipeline : object = 
      
    

    // if(permission.role == 'admin'){
    //   pipeline.push(

    //   )
    // } else{
    //   throw new CustomError("Unauthorized",statusCode.UNAUTHORIZED, "User is not Authorized");
    // }

    console.log(permission.read , permission.roleName)
    if(permission.read !== true || permission.roleName !== 'admin'){
      throw new CustomError("Unauthorized",statusCode.UNAUTHORIZED, "User is not Authorized");
    }

    const pipeline : PipelineStage[] = [
      {
        $match: {
          isDeleted : false,
        }
      },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role"
        }
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          role: "$role.role"
        }
      },
      {
        $project: {
           username: { $ifNull: ["$username", ""]},
           email : {$ifNull: ["$email", ""]},
           role:  {$ifNull: ["$role", ""]},
        }
      }
    ]
    return await User.aggregate(pipeline).exec();

  
    // if(authors && totalRecords && limit && page){
    //   return Object.assign(
    //     {
    //       data: {
    //         status: true,
    //         data: authors,
    //         totalPages: Math.ceil(totalRecords / limit),
    //         page,
    //         limit,
    //         totalRecords,
    //       },
    //     },
    //     { statusCode: statusCode.OK }
    //   )
      
    // }else{
    //   throw new CustomError(
    //     'CastError',
    //     statusCode.BAD_REQUEST,
    //     'This is cast Error'
    //   )
    // }




    
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
      const refreshToken : string = await user.getSignedToken();
      await User.findOneAndUpdate({ email: email }, {$set : {refreshToken : refreshToken}}, {new:true});
      return token;
    }
    return null;
  }

  async verifyUser(email, token) {
    // console.log(token);
    const user = await User.findOne({ email: email });
    // console.log(user);
    const secret : any = user.secret;
    // console.log(secret);
    const base32 = secret.base32;
    const verified = speakeasy.totp.verify({ token, encoding: 'base32', secret: base32 });
    if (verified) {
      return await user.getSignedToken()
    }
    return user.getSignedToken();
  }


  async updateUserbyId(body){

    const result = await User.findByIdAndUpdate()
  }
  
  async createUser(body) {
    // Generate the secret for the user
    body.secret = speakeasy.generateSecret({ length: 20 })
    const secret = body.secret
    // console.log(body)
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
