import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RoleGuard } from '../auth/role.guard';
import { CookieAuthenticationGuard } from "./cookie-authentication.guard";

export const ROLE_KEY = 'roles';

export function hasRole(...roles: string[]) {
   return applyDecorators(
      UseGuards(CookieAuthenticationGuard),
      SetMetadata(ROLE_KEY, roles),
      UseGuards(RoleGuard),
   );
}