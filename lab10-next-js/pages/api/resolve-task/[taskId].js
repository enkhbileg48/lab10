import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { taskId } = req.query;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { task_id: parseInt(taskId, 10) },
      data: {
        task_status_id: 1, 
        resolved_date: new Date(),
      },
    });

    return res.status(200).json({ message: 'Task resolved successfully', task: updatedTask });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
