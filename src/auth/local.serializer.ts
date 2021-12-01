import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
   constructor(
      private readonly userService: UserService,
   ) {
      super();
   }

   serializeUser(user: Prisma.UsersCreateInput, done: CallableFunction) {
      done(null, Number(user.id));
   }

   async deserializeUser(userId: string, done: CallableFunction) {
      const user = await this.userService.getUserById(BigInt(userId))
      done(null, user);
   }
}