import { controller, httpGet, httpPost, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types";
import { UserService } from "../services/userServices";


@controller('/')
    export class UserController {
        constructor(@inject(TYPES.UserService) private userService: UserService) { }
        @httpGet('/')
        public async getUsers() {
            return await this.userService.getUsers();
        }
    }