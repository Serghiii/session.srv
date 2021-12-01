import { Body, Controller, Post, Request, UseGuards, HttpCode, UseInterceptors, ClassSerializerInterceptor, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Language } from './language.decorator';
import { Prisma } from '@prisma/client';
import { LogInWithCredentialsGuard } from './logIn-with-credentials.guard';
import { CookieAuthenticationGuard } from './cookie-authentication.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

   constructor(private authService: AuthService) { }

   @HttpCode(200)
   @UseGuards(CookieAuthenticationGuard)
   @Get()
   async authenticate(@Req() req) {
      return JSON.stringify(
         req.user,
         (key, value) => (typeof value === 'bigint' ? value.toString() : value)
      )
   }

   @HttpCode(200)
   @UseGuards(LogInWithCredentialsGuard)
   @Post('/login')
   async login(@Request() req) {
      const user = await this.authService.login(req.user, req.body.rememberme);
      delete user.password
      return JSON.stringify(
         user,
         (key, value) => {
            if (typeof value === 'bigint') return value.toString()
            // if (key === 'password') return
            return value
         }
      )
   }

   @HttpCode(200)
   @Post('/register')
   async register(@Body() user: Prisma.UsersCreateInput, @Language() lang) {
      return await this.authService.register(user, lang);
   }

   @HttpCode(200)
   @UseGuards(CookieAuthenticationGuard)
   @Post('logout')
   async logOut(@Req() req) {
      req.logOut();
      req.session.cookie.maxAge = 0;
   }

}
