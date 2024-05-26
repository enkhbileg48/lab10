import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { clientId } = req.query;

    try {
      const tasks = await prisma.task.findMany({
        where: { client_id: parseInt(clientId) },
      });
      return res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  }

  if (req.method === 'POST') {
    const { clientId, description } = req.body;

    try {
      const newTask = await prisma.task.create({
        data: {
          description,
          client_id: parseInt(clientId),
          created_date: new Date(),
        },
      });
      return res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
