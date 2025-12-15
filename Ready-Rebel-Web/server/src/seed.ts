import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.contact.count();
  if (count === 0) {
    await prisma.contact.createMany({
      data: [
        { name: 'Leia Organa', email: 'leia@rebels.example', phone: '555-0101', notes: 'General', favorite: true },
        { name: 'Han Solo', email: 'han@rebels.example', phone: '555-0102', notes: 'Pilot' }
      ]
    });
    console.log('Seeded example contacts.');
  } else {
    console.log('Contacts already exist, skipping seed.');
  }
}

main().finally(() => prisma.$disconnect());
