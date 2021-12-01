import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env']
    }),
    PrismaModule,
    UserModule,
    RoleModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, RoleService, AuthService],
})
export class AppModule { }
