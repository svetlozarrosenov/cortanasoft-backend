import { applyDecorators, SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export function CompanyRoles(roles = []) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles));
}
