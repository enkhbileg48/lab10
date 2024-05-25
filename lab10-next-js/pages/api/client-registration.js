import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


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

    // Create the client and associated user
    const newClient = await prisma.client.create({
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

    return res.status(201).json({ message: 'Client registered successfully', client: newClient });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
