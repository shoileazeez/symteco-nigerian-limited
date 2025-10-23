#!/usr/bin/env node

/**
 * Delete Old Messages Script
 * 
 * This script allows you to delete old messages from the database
 * with various filtering options like date range, type, read status, etc.
 * 
 * Usage:
 *   node scripts/delete-old-messages.js [options]
 * 
 * Options:
 *   --days <number>        Delete messages older than X days (default: 30)
 *   --type <quote|contact> Delete only specific message types
 *   --read-only           Delete only read messages
 *   --unread-only         Delete only unread messages
 *   --dry-run             Show what would be deleted without actually deleting
 *   --force               Skip confirmation prompts
 *   --help                Show this help message
 * 
 * Examples:
 *   node scripts/delete-old-messages.js --days 90 --dry-run
 *   node scripts/delete-old-messages.js --type contact --read-only --force
 *   node scripts/delete-old-messages.js --days 180 --unread-only
 */

const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    days: 30,
    type: null,
    readOnly: false,
    unreadOnly: false,
    dryRun: false,
    force: false,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--days':
        options.days = parseInt(args[++i]) || 30;
        break;
      case '--type':
        const type = args[++i];
        if (type === 'quote' || type === 'contact') {
          options.type = type;
        } else {
          console.error('Invalid type. Use "quote" or "contact"');
          process.exit(1);
        }
        break;
      case '--read-only':
        options.readOnly = true;
        break;
      case '--unread-only':
        options.unreadOnly = true;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--force':
        options.force = true;
        break;
      case '--help':
        options.help = true;
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        options.help = true;
        break;
    }
  }

  // Validate conflicting options
  if (options.readOnly && options.unreadOnly) {
    console.error('Cannot use both --read-only and --unread-only');
    process.exit(1);
  }

  return options;
}

// Show help message
function showHelp() {
  console.log(`
Delete Old Messages Script

This script allows you to delete old messages from the database
with various filtering options like date range, type, read status, etc.

Usage:
  node scripts/delete-old-messages.js [options]

Options:
  --days <number>        Delete messages older than X days (default: 30)
  --type <quote|contact> Delete only specific message types
  --read-only           Delete only read messages
  --unread-only         Delete only unread messages
  --dry-run             Show what would be deleted without actually deleting
  --force               Skip confirmation prompts
  --help                Show this help message

Examples:
  node scripts/delete-old-messages.js --days 90 --dry-run
  node scripts/delete-old-messages.js --type contact --read-only --force
  node scripts/delete-old-messages.js --days 180 --unread-only

Safety Features:
  - Dry run mode to preview deletions
  - Confirmation prompts (unless --force is used)
  - Detailed logging of what was deleted
  - Backup recommendations before deletion
`);
}

// Ask for user confirmation
function askConfirmation(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`${message} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Build the where clause for Prisma query
function buildWhereClause(options) {
  const where = {};

  // Date filter - messages older than X days
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - options.days);
  where.createdAt = { lt: cutoffDate };

  // Type filter
  if (options.type) {
    where.type = options.type;
  }

  // Read status filter
  if (options.readOnly) {
    where.isRead = true;
  } else if (options.unreadOnly) {
    where.isRead = false;
  }

  return where;
}

// Format message for display
function formatMessage(message) {
  return `${message.id} | ${message.type.toUpperCase()} | ${message.fromName} <${message.fromEmail}> | ${message.createdAt.toLocaleDateString()} | ${message.isRead ? 'READ' : 'UNREAD'}`;
}

// Main deletion function
async function deleteMessages(options) {
  try {
    console.log('🗄️  Message Deletion Tool\n');
    
    if (options.help) {
      showHelp();
      return;
    }

    // Build query conditions
    const where = buildWhereClause(options);
    
    console.log('📋 Deletion Parameters:');
    console.log(`   Days: ${options.days} (messages older than ${new Date(Date.now() - options.days * 24 * 60 * 60 * 1000).toLocaleDateString()})`);
    if (options.type) console.log(`   Type: ${options.type}`);
    if (options.readOnly) console.log(`   Status: Read only`);
    if (options.unreadOnly) console.log(`   Status: Unread only`);
    console.log(`   Mode: ${options.dryRun ? 'DRY RUN (no actual deletion)' : 'LIVE DELETION'}`);
    console.log('');

    // Find messages that match criteria
    console.log('🔍 Finding messages that match criteria...');
    const messagesToDelete = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    if (messagesToDelete.length === 0) {
      console.log('✅ No messages found matching the criteria.');
      return;
    }

    console.log(`📊 Found ${messagesToDelete.length} message(s) to delete:\n`);

    // Group messages by type for summary
    const summary = {
      total: messagesToDelete.length,
      quotes: messagesToDelete.filter(m => m.type === 'quote').length,
      contacts: messagesToDelete.filter(m => m.type === 'contact').length,
      read: messagesToDelete.filter(m => m.isRead).length,
      unread: messagesToDelete.filter(m => !m.isRead).length
    };

    console.log('📈 Summary:');
    console.log(`   Total messages: ${summary.total}`);
    console.log(`   Quote requests: ${summary.quotes}`);
    console.log(`   Contact messages: ${summary.contacts}`);
    console.log(`   Read messages: ${summary.read}`);
    console.log(`   Unread messages: ${summary.unread}`);
    console.log('');

    // Show first 10 messages as preview
    console.log('📝 Preview (first 10 messages):');
    messagesToDelete.slice(0, 10).forEach((message, index) => {
      console.log(`   ${index + 1}. ${formatMessage(message)}`);
    });
    
    if (messagesToDelete.length > 10) {
      console.log(`   ... and ${messagesToDelete.length - 10} more messages`);
    }
    console.log('');

    // Dry run - just show what would be deleted
    if (options.dryRun) {
      console.log('🔍 DRY RUN MODE - No messages were actually deleted.');
      console.log('   Run without --dry-run to perform actual deletion.');
      return;
    }

    // Safety warning
    console.log('⚠️  WARNING: This action cannot be undone!');
    console.log('   Consider backing up your database before proceeding.');
    console.log('   Recommendation: Run "npx prisma db push --force-reset" after backing up.');
    console.log('');

    // Confirmation (unless --force is used)
    if (!options.force) {
      const confirmed = await askConfirmation(
        `Are you sure you want to delete ${messagesToDelete.length} message(s)?`
      );
      
      if (!confirmed) {
        console.log('❌ Deletion cancelled by user.');
        return;
      }
    }

    // Perform deletion
    console.log('🗑️  Deleting messages...');
    const deleteResult = await prisma.message.deleteMany({ where });
    
    console.log(`✅ Successfully deleted ${deleteResult.count} message(s).`);
    
    // Log deleted message IDs for record keeping
    if (deleteResult.count > 0) {
      console.log('\n📝 Deleted message details logged:');
      messagesToDelete.forEach(message => {
        console.log(`   ${formatMessage(message)}`);
      });
    }

  } catch (error) {
    console.error('❌ Error during message deletion:', error.message);
    
    if (error.code === 'P2002') {
      console.error('   This might be a database constraint issue.');
    } else if (error.code === 'P2025') {
      console.error('   Some messages may have already been deleted.');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Additional utility functions for specific use cases
async function deleteAllMessages(force = false) {
  if (!force) {
    console.log('⚠️  This will delete ALL messages in the database!');
    const confirmed = await askConfirmation('Are you absolutely sure?');
    if (!confirmed) {
      console.log('❌ Operation cancelled.');
      return;
    }
  }

  const result = await prisma.message.deleteMany({});
  console.log(`✅ Deleted all ${result.count} messages.`);
}

async function deleteMessagesByEmail(email, force = false) {
  const messages = await prisma.message.findMany({
    where: { fromEmail: email }
  });

  if (messages.length === 0) {
    console.log(`No messages found from email: ${email}`);
    return;
  }

  if (!force) {
    console.log(`Found ${messages.length} messages from ${email}`);
    const confirmed = await askConfirmation('Delete these messages?');
    if (!confirmed) {
      console.log('❌ Operation cancelled.');
      return;
    }
  }

  const result = await prisma.message.deleteMany({
    where: { fromEmail: email }
  });
  
  console.log(`✅ Deleted ${result.count} messages from ${email}.`);
}

// Export functions for use in other scripts
module.exports = {
  deleteMessages,
  deleteAllMessages,
  deleteMessagesByEmail,
  buildWhereClause,
  formatMessage
};

// Run the script if called directly
if (require.main === module) {
  const options = parseArgs();
  deleteMessages(options).catch(console.error);
}