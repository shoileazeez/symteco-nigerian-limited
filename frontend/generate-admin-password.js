const bcrypt = require('bcryptjs');

async function generatePassword() {
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('Password:', password);
  console.log('Hashed Password:', hashedPassword);
  console.log('\nUse this hashed password in Prisma Studio for the password field');
}

generatePassword();