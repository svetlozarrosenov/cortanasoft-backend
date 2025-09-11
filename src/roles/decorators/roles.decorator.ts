import { applyDecorators, SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export function Roles(roles=[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles));
}
