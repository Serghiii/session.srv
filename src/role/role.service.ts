import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
   constructor(private prismaService: PrismaService) { }
   async getRoles() {
      return this.prismaService.roles.findMany()
   }
}
