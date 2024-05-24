import { UserInterface } from '../userInterface'

export interface UserServiceInterface {
  getUsers: () => Promise<UserInterface[]>
  createUser: (body: any) => Promise<any>
}
