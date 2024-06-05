import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { TYPES } from '../types'
import { UserService } from '../services/'
import { Request, Response, NextFunction } from 'express'
import { errorHandler } from '../handler/errorHandler'
import { ApiHandler, CustomError, statusCode } from '../utils'
import { AuthRequest } from '../interface'
import { moduleType } from '../utils'
import { BlogPostService } from '../services/'

@controller('/blog', moduleType('blog'))
export class BlogpostController {
  constructor(
    @inject(TYPES.BlogPostService)
    private readonly blogPostService: BlogPostService
  ) {}
  public async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username, email, role, password, profilePicture } = req.body
      console.log({ username, email, role, password, profilePicture })
      const body = { username, email, role, password, profilePicture }
      const validatedBody = await blogSchema.validate(body)

      const qrBuffer = await this.blogPostService.createBlog(validatedBody)
      // res.contentType('image/png')
      // res.send(qrBuffer)
    } catch (err) {
      console.error('Error in createUser:', err)
      if (!res.headersSent) {
        errorHandler(req, res, next, err)
      }
    }
  }
}
