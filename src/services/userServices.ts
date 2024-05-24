import { injectable } from 'inversify'
import { UserInterface, UserServiceInterface } from '../interface'
import { User } from '../models/userModel'
import { CustomError, statusCode } from '../utils'
import messages from 'src/utils/messages'

@injectable()
export class UserService implements UserServiceInterface {
  constructor() {}
  async getUsers() {
    return User.find()
  }

  async createUser(body) {
    const { role, password, email, username, secret }: UserInterface = body
    const user: UserInterface = new User(body)
    if (!user) {
      throw new CustomError(
        messages.User_Not_Created.name,
        statusCode.BAD_REQUEST,
        messages.User_Not_Created.message
      )
    }
    const result = await user.save()
    console.log(result)
    return result
  }
}
