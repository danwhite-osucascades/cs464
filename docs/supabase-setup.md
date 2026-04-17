# Supabase Setup and Deployment

This guide explains how to set up Supabase for this project in an open-source environment.

## Overview

This project uses Supabase as its database solution. Since this is an open-source project, we do not share API keys or database credentials. Each contributor must set up their own Supabase project.

## Prerequisites

- A Supabase account (free at [supabase.com](https://supabase.com))
- Node.js and npm installed

## Installation

First, install the Supabase JavaScript client:

```bash
npm install @supabase/supabase-js
```

## Setting Up Your Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in.

2. Click "New project".

3. Fill in the project details:
   - Name: Choose a name for your project
   - Database Password: Choose a strong password
   - Region: Select a region close to you

4. Wait for the project to be created (this may take a few minutes).

## Database Schema

Once your project is ready, set up the database tables:

1. Go to the SQL Editor in your Supabase dashboard.

2. Run the following SQL to create the tables:

```sql
-- Create datasets table
CREATE TABLE datasets (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create data_items table
CREATE TABLE data_items (
  id SERIAL PRIMARY KEY,
  dataset_name TEXT NOT NULL REFERENCES datasets(name) ON DELETE CASCADE,
  name TEXT NOT NULL,
  item_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_data_items_dataset_name ON data_items(dataset_name);
CREATE INDEX idx_data_items_order ON data_items(item_order);
```

## Environment Variables

Create a `.env.local` file in the project root (this file is gitignored):

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase dashboard under Settings > API.

- `SUPABASE_URL` and `SUPABASE_KEY` are used by the server-side app.
- `SUPABASE_SERVICE_ROLE_KEY` is recommended for data migration scripts.
- `NEXT_PUBLIC_SUPABASE_*` values are only needed if the client needs direct read access.

## Migrating Data

To populate your database with the existing JSON data:

1. Install Supabase CLI (optional, for advanced users):
   ```bash
   npm install -g supabase
   ```

2. Or use the dashboard to manually insert data.

For development, you can create a script to import the JSON data. See the data migration section below.

## Running the Project

After setting up Supabase and environment variables:

```bash
npm run dev
```

The API will now use Supabase instead of local JSON files.

## Data Migration Script

Create a script to migrate the existing JSON data to Supabase. Here's an example:

```javascript
// scripts/migrate-data.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY ?? process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Define SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  const dataDir = path.join(__dirname, '..', 'data');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const datasetName = file.replace('.json', '');

    // Insert or update dataset by name
    const { data: dataset, error: datasetError } = await supabase
      .from('datasets')
      .upsert(
        {
          name: datasetName,
          title: content.title,
          description: content.description
        },
        { onConflict: 'name' }
      )
      .select();

    if (datasetError) {
      console.error(`Error inserting dataset ${datasetName}:`, datasetError);
      continue;
    }

    const items = content.items.map((item) => ({
      dataset_name: datasetName,
      name: item.name,
      item_order: item.order
    }));

    const { error: itemsError } = await supabase
      .from('data_items')
      .insert(items);

    if (itemsError) {
      console.error(`Error inserting items for ${datasetName}:`, itemsError);
    } else {
      console.log(`Migrated ${datasetName}`);
    }
  }
}

migrateData().catch(console.error);
```

Run this script after setting up your environment variables:

```bash
node scripts/migrate-data.js
```

## Contributing

When contributing to this project:

1. Set up your own Supabase project following the steps above.
2. Do not commit any API keys or database credentials.
3. Test your changes with your local Supabase instance.
4. If you modify the database schema, update this documentation and the migration scripts.

## Troubleshooting

- **Connection issues**: Verify your environment variables are correct.
- **Permission errors**: Check that your Supabase project's RLS (Row Level Security) policies allow the operations you're trying to perform.
- **Data not showing**: Ensure you've run the migration script or manually inserted the data.

For more help, check the [Supabase documentation](https://supabase.com/docs).