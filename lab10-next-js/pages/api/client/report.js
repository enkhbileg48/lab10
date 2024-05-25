import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save the report to the database
    const newReport = await prisma.report.create({
      data: {
        content,
        userId: parseInt(userId), // Assuming userId is an integer
      },
    });

    return res.status(201).json({ message: 'Report submitted successfully', report: newReport });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
