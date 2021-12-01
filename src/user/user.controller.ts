import { Controller, Get, Param } from '@nestjs/common';
import { hasRole } from 'src/auth/role.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) { }

   @hasRole("USER")
   @Get()
   async getAll() {
      return JSON.stringify(
         await this.userService.getUsers(),
         (key, value) => (typeof value === 'bigint' ? value.toString() : value)
      )
   }

   @hasRole("ADMIN")
   @Get('/:value')
   async getOne(@Param('value') value: string) {
      const user = await this.userService.getUserById(BigInt(value))
      delete user.password
      return JSON.stringify(
         user,
         (key, value) => (typeof value === 'bigint' ? value.toString() : value)
      )
   }

}
