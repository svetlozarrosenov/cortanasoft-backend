import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/company-roles.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/company/schemas/company.schema';

@Injectable()
export class CompanyRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredCompanyRolesIds = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredCompanyRolesIds) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const company = await this.companyModel.findOne({ _id: user.companyId });

    return requiredCompanyRolesIds.some(
      (roleId) => company.roleId?.toString() === roleId,
    );
  }
}
