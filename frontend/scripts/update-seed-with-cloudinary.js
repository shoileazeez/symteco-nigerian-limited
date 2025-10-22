#!/usr/bin/env node
// Read tmp/cloudinary-mapping.json and update prisma Project records
// Usage:
//  - Dry run (default): node scripts/update-seed-with-cloudinary.js
//  - Apply changes:     node scripts/update-seed-with-cloudinary.js --apply

const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mappingPath = path.resolve(__dirname, '../tmp/cloudinary-mapping.json');
if (!fs.existsSync(mappingPath)) {
  console.error('Mapping file not found. Run upload-public-to-cloudinary.js first to generate tmp/cloudinary-mapping.json');
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

async function main() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const apply = process.argv.includes('--apply');

  console.log('Cloudinary mapping:', mappingPath);
  console.log('Mode:', apply ? 'APPLY (will update DB)' : 'DRY-RUN (no changes)');

  try {
    const projects = await prisma.project.findMany();
    console.log('Found', projects.length, 'projects');

    for (const project of projects) {
      // Replace local image paths with cloudinary urls where mapping exists
      let updated = false;
      const originalImages = project.images || [];
      const newImages = originalImages.map(img => mapping[img] || img);

      const originalMain = project.image || (originalImages[0] || null);
      const mappedMain = (project.image && mapping[project.image]) ? mapping[project.image] : (newImages[0] || originalMain);

      if (JSON.stringify(newImages) !== JSON.stringify(originalImages) || mappedMain !== originalMain) {
        updated = true;
      }

      if (updated) {
        console.log('Would update project', project.id);
        console.log('  original image:', originalMain);
        console.log('  new main image:', mappedMain);
        console.log('  original images:', JSON.stringify(originalImages));
        console.log('  new images     :', JSON.stringify(newImages));

        if (apply) {
          await prisma.project.update({
            where: { id: project.id },
            data: {
              images: newImages,
              image: mappedMain,
            }
          });
          console.log('  -> Applied update for project', project.id);
        }
      }
    }

    console.log('Done updating projects');
  } catch (err) {
    console.error('Error updating projects:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
