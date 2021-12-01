import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
   constructor(private prismaService: PrismaService) { }

   async getUsers() {
      return this.prismaService.users.findMany({
         select: {
            id: true,
            phone: true,
            email: true,
            createdAt: true,
            password: false,
         }
      })
   }

   async getUserById(id: bigint) {
      return this.prismaService.users.findUnique({
         where: {
            id
         },
         include: {
            roles: true
         }
      })
   }

   async getUserByLogin(phone: string, email: string) {
      return await this.prismaService.users.findFirst({
         where: {
            OR: [
               { phone },
               { email }
            ]
         },
         include: {
            roles: true
         }
      })
   }

   async createUser(dt: Prisma.UsersCreateInput, role: Prisma.RolesWhereUniqueInput, lang: string = 'uk'): Promise<Users> {
      try {
         return await this.prismaService.users.create({
            data: {
               phone: dt.phone,
               email: dt.email,
               password: dt.password,
               roles: {
                  connect: {
                     name: role.name
                  },
               }
            }
         })
      } catch (e) {
         throw new HttpException("translate('messages.create_user_error', lang)", HttpStatus.BAD_REQUEST);
      }
   }

}
