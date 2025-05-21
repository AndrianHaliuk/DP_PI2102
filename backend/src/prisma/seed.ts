import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({ where: { id: 3 } });
  if (!existingUser) {
    throw new Error('User with id 4 not found');
  }

  await prisma.bankAccount.create({
    data: {
      userId: 3,
      provider: 'Stripe',
      accountId: 'test_account_id2',
      isDefault: true,
    },
  });
  console.log('✅ Bank account created!');
}
main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
