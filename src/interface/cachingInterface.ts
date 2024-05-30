import { Response } from "express";

export interface CustomResponse<T = any> extends Response<T> {
    // Add the sendResponse property with the same signature as Response's send method
    sendResponse: (body?: any) => this;
}