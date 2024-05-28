import { UserInterface } from '../userInterface'

export interface UserServiceInterface {
  getUsers: () => Promise<UserInterface[]>
  createUser: (body: any) => Promise<any>
  verifyUser: (email:string, token:string) => Promise<string>
  login: (email:string , password: string) => Promise<string>
  getAllUsers: () => Promise<UserInterface[]>
  getDeletedUsers: () => Promise<UserInterface[]>
}
