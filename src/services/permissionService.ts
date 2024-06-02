import { injectable } from 'inversify'
import { Module, Permission, Role } from '../models'

@injectable()
export class PermissionService {
  constructor() {}
  async getPermissions(module, role) {
    console.log(role)
    let roles = await Role.findOne({ _id: role })
    // console.log(roles.role)
    let userRole: any = roles.role

    const permissions = [
      {
        $lookup: {
          from: 'roles',
          localField: 'roleid',
          foreignField: '_id',
          as: 'role'
        }
      },
      {
        $unwind: {
          path: '$role',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'modules',
          localField: 'moduleid',
          foreignField: '_id',
          as: 'module'
        }
      },
      {
        $unwind: {
          path: '$module',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          moduleName: '$module.name', // Module Name should be passed here
          roleName: '$role.role'
        }
      },
      {
        $match: {
          moduleName: module,
          roleName: userRole
        }
      },
      {
        $project: {
          read: { $cond: { if: '$read', then: '$read', else: '$$REMOVE' } },
          write: { $cond: { if: '$write', then: '$write', else: '$$REMOVE' } },
          delete: {
            $cond: { if: '$delete', then: '$delete', else: '$$REMOVE' }
          },
          update: {
            $cond: { if: '$update', then: '$update', else: '$$REMOVE' }
          },
          roleName: 1,
          _id: 0
        }
      }
    ]

    const result = await Permission.aggregate(permissions)
    return result
  }
  async addPermissions(body) {
    const module = await Module.findOne({ name: body.name })
    console.log(module)
    const role = await Role.findOne({ role: body.role })
    console.log(role)
    const newPermission = new Permission({
      moduleid: module._id,
      roleid: role._id,
      read: body.read,
      write: body.write,
      update: body.update,
      delete: body.delete
    })
    await newPermission.save()
    return newPermission
  }
}
