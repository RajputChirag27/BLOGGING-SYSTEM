import { BaseMiddleware } from 'inversify-express-utils';
import cache from 'memory-cache'
import { AuthRequest, CustomResponse } from '../interface';
import { Response, NextFunction } from 'express';

// Middleware for caching


export class CachingMiddleware extends BaseMiddleware {
    async handler(req: AuthRequest, res: CustomResponse, next: NextFunction) {
        let key = '__express__' + (req.originalUrl || req.url);
        let cachedBody = cache.get(key);
        // console.log(cachedBody)
        if (cachedBody) {
            res.contentType(cachedBody.headers['content-type'])
            res.send(cachedBody.body);
        } else {
            // Override res.send
            res.sendResponse = res.send;
            res.send = function (this: CustomResponse, body: any): CustomResponse {
                const headers = res.getHeaders();
                cache.put(key, {body,headers}, 10000); // Cache for 10 seconds
                return this.sendResponse(body); // Return the original sendResponse
            };
            next();
        }
    }
}
