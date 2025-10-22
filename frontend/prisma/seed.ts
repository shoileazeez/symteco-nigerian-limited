import bcrypt from 'bcryptjs'
import { prisma } from '../src/lib/prisma'

const projectsData = [
  {
    title: "Substation Construction Project",
    category: "Substation Installation",
    location: "Abeokuta, Ogun State",
    year: "2025",
    image: "/project-abeokuta-substation-construction.jpg",
    description: "Ground-up construction of electrical substation including foundation work, structural installation, and electrical equipment setup in Abeokuta with specialized crew and safety protocols.",
    tags: ["Civil Construction", "Substation Building", "Foundation Work", "Electrical Infrastructure"],
    status: "Completed",
    featured: true,
  },
  {
    title: "Power Transformer Installation",
    category: "Transformer Installation", 
    location: "Ikeja, Lagos State",
    year: "2023",
    image: "/project-ikeja-transformer-installation.jpg",
    description: "Professional installation and commissioning of large industrial power transformer with protective housing, control systems, and safety equipment at industrial facility in Ikeja.",
    tags: ["Power Transformer", "Industrial Installation", "Protective Housing", "Safety Systems"],
    status: "Completed",
    featured: true,
  },
  {
    title: "High Voltage Line Maintenance",
    category: "Transmission Line Work",
    location: "Multiple Sites, Nigeria", 
    year: "2024",
    image: "/project-high-voltage-line-work.jpg",
    description: "High-altitude maintenance and repair work on transmission lines including conductor replacement, insulator maintenance, and structural reinforcement by certified technicians.",
    tags: ["High Voltage", "Line Maintenance", "Safety Work", "Conductor Replacement"],
    status: "Completed",
    featured: true,
  },
  {
    title: "Distribution Pole Transformer Installation",
    category: "Distribution Systems",
    location: "Lagos State",
    year: "2025", 
    image: "/project-lagos-distribution-transformer.jpg",
    description: "Installation of pole-mounted distribution transformer with proper grounding, protective equipment, and connection to distribution network for residential and commercial power supply.",
    tags: ["Pole Mount", "Distribution Transformer", "Grounding", "Network Connection"],
    status: "Completed",
    featured: false,
  },
  {
    title: "Industrial Electrical Technician Services",
    category: "Technical Services",
    location: "Industrial Facilities",
    year: "2024",
    image: "/project-technician-electrical-work.jpg", 
    description: "Skilled electrical technician performing precision electrical work on industrial equipment including control panel maintenance, wiring, and system diagnostics in controlled environment.",
    tags: ["Technical Services", "Control Panels", "Precision Work", "System Diagnostics"],
    status: "Completed",
    featured: false,
  },
  {
    title: "Electrical Maintenance & Troubleshooting",
    category: "Maintenance Services",
    location: "Various Sites, Nigeria",
    year: "2024",
    image: "/project-electrical-maintenance.jpg",
    description: "Comprehensive electrical maintenance services including equipment inspection, troubleshooting, repairs, and preventive maintenance to ensure optimal system performance and safety.",
    tags: ["Preventive Maintenance", "Troubleshooting", "Equipment Inspection", "System Optimization"],
    status: "Completed",
    featured: false,
  },
];

async function main() {
  console.log('🌱 Seeding database...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@symteconigerialimited.com' },
    update: {},
    create: {
      email: 'admin@symteconigerialimited.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('✅ Admin user created:', admin.email)
  console.log('🔑 Default password: admin123')
  console.log('⚠️  Please change this password after first login!')

  // Seed projects
  console.log('📁 Seeding projects...')
  
  for (const project of projectsData) {
    const existingProject = await prisma.project.findFirst({
      where: { title: project.title }
    });
    
    if (!existingProject) {
      await prisma.project.create({
        data: project,
      });
      console.log(`✅ Created project: ${project.title}`);
    } else {
      console.log(`⏭️  Project already exists: ${project.title}`);
    }
  }

  console.log('🎉 Database seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })