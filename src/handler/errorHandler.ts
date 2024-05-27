import { Request, Response, NextFunction } from 'express'
import { CustomError, statusCode } from '../utils'
import { AuthRequest } from '../interface'

export const errorHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  err: any
) => {
  try {
    console.log(
      'Custom Error Handler => ',
      err.name,
      err.message,
      err.statusCode,
      err.message
    )

    if (res) {
      return res.status(err.statusCode || 500).json({
        success: false,
        error: err.message
        // errors : err
      })
    } else {
      throw new CustomError(
        'Response object is not defined',
        statusCode.INTERNAL_SERVER_ERROR,
        'Internal Server Error'
      )
    }
  } catch (error) {
    next(error) // Forward the error to the next error handler
  }
}
