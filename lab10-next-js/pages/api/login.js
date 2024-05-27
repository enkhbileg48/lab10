import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method Not Allowed'});
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required'});
  }
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {username},
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    // Compare password with hashed ones
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    // Determine role: staff or client
    const client = await prisma.client.findFirst({
      where: { user_id: user.user_id },
    });
    const staff = await prisma.staff.findFirst({
      where: { user_id: user.user_id },
    });
    const role = client ? 'client' : staff ? 'staff' : null;
    return res.status(200).json({ message: 'Login successful', role });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
