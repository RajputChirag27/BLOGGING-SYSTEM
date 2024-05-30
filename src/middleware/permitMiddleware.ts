import { AuthRequest } from "../interface";
import { Response, NextFunction } from "express";

interface Permission {
    read: boolean;
    write: boolean;
    update: boolean;
    delete: boolean;
    roleName: string;
}

interface User {
    permissions: Permission[];
}


const permit = (requiredPermission : Permission) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user: User = req.permission as User;

        // if (!permission.role && permission.read ) {
        //     return res.status(403).send('Access denied.');
        // }
        next();
    };
};