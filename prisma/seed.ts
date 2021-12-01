import { roles } from './roles'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

async function main() {
   for (let r of roles) {
      const role = await prisma.roles.create({
         data: r
      })
      console.log(`Created role ${role.name} with id ${role.id}`);
   }
   console.log('Seeding finished.');
}

main().catch(e => {
   console.error(e)
   process.exit(1)
}).finally(() => {
   prisma.$disconnect()
})