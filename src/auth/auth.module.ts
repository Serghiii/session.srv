import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, LocalSerializer]
})
export class AuthModule { }
