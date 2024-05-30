
import { NextFunction,Request } from "express";
import { AuthRequest } from "../interface";

export const moduleType = (moduleName : string) => {
    return(
        (req: AuthRequest, res: Response, next: NextFunction) => {
        req.headers.module = moduleName;
        next();
        }
    )
    
}