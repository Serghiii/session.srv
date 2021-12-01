import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
   constructor(private userService: UserService) { }

   public async validateUser(username: string, password: string, lang: string = 'uk') {
      const user = await this.userService.getUserByLogin(username, username);
      if (user) {
         const passwordEquals = await bcrypt.compare(password, user.password);
         if (passwordEquals) {
            return user;
         }
      }
      throw new UnauthorizedException({ message: "translate('messages.login_password_not_corrected', lang)" });
   }

   public async login(user: Prisma.UsersCreateInput, rememberme: boolean = false) {
      return user;
   }

   public async register(newuser: Prisma.UsersCreateInput, lang: string = 'uk') {
      const hashPassword = await bcrypt.hash(newuser.password, 5);
      const user = await this.userService.createUser({ ...newuser, password: hashPassword }, { name: 'USER' }, lang);
      return { phone: user.phone, email: user.email };
   }

}
