import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
   imports: [PrismaModule],
   exports: [UserService, PrismaService],
   providers: [UserService, PrismaService],
   controllers: [UserController]
})
export class UserModule { }