import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if any admin already exists
    const existingAdmin = await prisma.admin.findFirst();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin account already exists' });
    }

    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the admin
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name: name || 'Admin',
        role: 'admin',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({ 
      message: 'Admin account created successfully',
      admin 
    });
  } catch (error: any) {
    console.error('Create admin error:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
}