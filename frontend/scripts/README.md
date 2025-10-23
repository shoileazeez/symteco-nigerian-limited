# Scripts

This folder contains utility scripts for managing the Symteco Nigerian Limited application.

## Message Management Scripts

### delete-old-messages.js

A powerful script for cleaning up old messages from the database with various filtering options.

#### Basic Usage

```bash
# Delete messages older than 30 days (default)
node scripts/delete-old-messages.js

# Delete messages older than 90 days
node scripts/delete-old-messages.js --days 90

# Preview what would be deleted (dry run)
node scripts/delete-old-messages.js --days 60 --dry-run
```

#### Advanced Usage

```bash
# Delete only read contact messages older than 30 days
node scripts/delete-old-messages.js --type contact --read-only

# Delete only unread quote requests older than 7 days
node scripts/delete-old-messages.js --days 7 --type quote --unread-only

# Delete without confirmation prompts
node scripts/delete-old-messages.js --days 180 --force

# Combine multiple filters
node scripts/delete-old-messages.js --days 60 --type contact --read-only --dry-run
```

#### Options

- `--days <number>`: Delete messages older than X days (default: 30)
- `--type <quote|contact>`: Delete only specific message types
- `--read-only`: Delete only read messages
- `--unread-only`: Delete only unread messages
- `--dry-run`: Show what would be deleted without actually deleting
- `--force`: Skip confirmation prompts
- `--help`: Show help message

#### Safety Features

- **Dry run mode**: Preview deletions before executing
- **Confirmation prompts**: Asks for confirmation unless `--force` is used
- **Detailed logging**: Shows exactly what was deleted
- **Backup recommendations**: Suggests backing up before deletion

#### Examples

```bash
# Safe exploration - see what would be deleted
node scripts/delete-old-messages.js --days 180 --dry-run

# Clean up old read messages
node scripts/delete-old-messages.js --days 90 --read-only

# Remove old contact messages (keep quotes)
node scripts/delete-old-messages.js --days 60 --type contact

# Aggressive cleanup (with confirmation)
node scripts/delete-old-messages.js --days 14

# Automated cleanup (no prompts)
node scripts/delete-old-messages.js --days 30 --read-only --force
```

## Database Backup Recommendations

Before running deletion scripts, consider backing up your database:

```bash
# Using PostgreSQL dump
pg_dump your_database_name > backup_$(date +%Y%m%d_%H%M%S).sql

# Using Prisma
npx prisma db seed --preview-feature
```

## UI-Based Deletion

You can also delete messages through the admin interface:

1. Go to Admin → Messages
2. Click the 🗑️ trash icon next to any message
3. Confirm the deletion
4. Or open a message and click "Delete Message" in the dialog

## Scheduling Automated Cleanup

You can schedule the script to run automatically using cron:

```bash
# Edit crontab
crontab -e

# Add this line to run cleanup every Sunday at 2 AM (delete messages older than 90 days)
0 2 * * 0 cd /path/to/your/app && node scripts/delete-old-messages.js --days 90 --read-only --force
```

## Troubleshooting

### Permission Issues
```bash
# Make the script executable
chmod +x scripts/delete-old-messages.js
```

### Database Connection Issues
- Ensure your `.env` file has correct database credentials
- Check if the database is running
- Verify Prisma client is properly configured

### Node.js Issues
```bash
# Install dependencies
npm install

# Check Node.js version (requires Node 14+)
node --version
```

## Contributing

When adding new scripts:

1. Add comprehensive help text
2. Include safety features (dry-run, confirmations)
3. Add logging for audit trails
4. Update this README
5. Test thoroughly before committing