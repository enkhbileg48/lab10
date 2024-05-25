import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

console.log("Initializing Prisma client...");
const prisma = new PrismaClient();

console.log("Prisma client initialized:", prisma);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, username, password } = req.body;

  // Check if all required fields are present
  if (!name || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the staff and associated user
    const newStaff = await prisma.staff.create({
      data: {
        name,
        user: {
          create: {
            username,
            password: hashedPassword,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return res.status(201).json({ message: 'Staff registered successfully', staff: newStaff });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
