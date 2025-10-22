import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  // For GET requests (public), no authentication required
  if (req.method === 'GET') {
    try {
      const { featured } = req.query;
      
      const projects = await prisma.project.findMany({
        where: featured === 'true' ? { featured: true } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json({ success: true, projects });
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
  }

  // For other operations, require authentication
  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  switch (req.method) {
    case 'POST':
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

        if (!title || !description || !category || !location || !year) {
          return res.status(400).json({
            success: false,
            error: 'Missing required fields: title, description, category, location, year',
          });
        }

        const project = await prisma.project.create({
          data: {
            title,
            description,
            image: image || '',
            images: images || [],
            category,
            location,
            year,
            tags: tags || [],
            status: status || 'Completed',
            featured: featured || false,
            client,
            duration,
            value,
            content,
          },
        });

        return res.status(201).json({ success: true, project });
      } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ success: false, error: 'Failed to create project' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}