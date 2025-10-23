import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken, JWTPayload } from '../../../lib/jwt';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = verifyToken(req, res);
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid project ID' });
  }

  // GET requests are public
  if (req.method === 'GET') {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
      });

      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }

      return res.status(200).json({ success: true, project });
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch project' });
    }
  }

  // Other operations require authentication
  if (!user) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  switch (req.method) {
    case 'PUT':
      try {
        const {
          title,
          description,
          image,
          images,
          category,
          location,
          year,
          tags,
          status,
          featured,
          client,
          duration,
          value,
          content,
        } = req.body;

        const project = await prisma.project.update({
          where: { id },
          data: {
            title,
            description,
            image,
            images,
            category,
            location,
            year,
            tags,
            status,
            featured,
            client,
            duration,
            value,
            content,
          },
        });

        return res.status(200).json({ success: true, project });
      } catch (error: any) {
        console.error('Error updating project:', error);
        if (error.code === 'P2025') {
          return res.status(404).json({ success: false, error: 'Project not found' });
        }
        return res.status(500).json({ success: false, error: 'Failed to update project' });
      }

    case 'DELETE':
      try {
        await prisma.project.delete({
          where: { id },
        });

        return res.status(200).json({ success: true, message: 'Project deleted successfully' });
      } catch (error: any) {
        console.error('Error deleting project:', error);
        if (error.code === 'P2025') {
          return res.status(404).json({ success: false, error: 'Project not found' });
        }
        return res.status(500).json({ success: false, error: 'Failed to delete project' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}