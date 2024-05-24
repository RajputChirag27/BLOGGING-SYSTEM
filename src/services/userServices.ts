import { injectable } from "inversify";
import { UserInterface } from "src/interface";
import { User } from "src/models/userModel";

@injectable()
export class UserService {
    constructor(){}
    public async getUsers(): Promise< UserInterface[]> {
        return User.find();
}
}