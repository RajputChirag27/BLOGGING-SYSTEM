import { injectable } from 'inversify'
import { UserInterface, UserServiceInterface } from '../interface'
import { Module, User } from '../models'
import { CustomError, statusCode } from '../utils'
import messages from '../utils/messages'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { promisify } from 'util'
import mongoose, { PipelineStage, isObjectIdOrHexString } from 'mongoose'
import { Role } from '../models'
import { RoleInterface } from '../models/roleModel'

@injectable()
export class BlogPostService {
  constructor() {}
}
