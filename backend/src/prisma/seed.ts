import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.bankAccount.create({
    data: {
      userId: 4,
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
