import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles, RolesDocument } from '../schemas/roles.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Roles.name) private rolesModel: Model<RolesDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, method, baseUrl, route } = request;

    if (!user || !user.roleId) {
      console.log('No user or roleId found');
      return false;
    }

    const role = await this.rolesModel.findOne({ _id: user.roleId });
    if (!role || !role.backendPermissions) {
      console.log(
        'No role or backendPermissions found for roleId:',
        user.roleId,
      );
      return false;
    }

    const reqRouteDefinition = `${method.toUpperCase()}::${
      baseUrl + route.path.replace(/\/$/, '')
    }`;

    const isAllowed = role.backendPermissions.includes(reqRouteDefinition);

    console.log('Request:', reqRouteDefinition);
    return isAllowed;
  }
}
