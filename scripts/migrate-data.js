const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY ?? process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please define SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  const dataDir = path.join(__dirname, '..', 'data');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const datasetName = file.replace('.json', '');

    console.log(`Migrating ${datasetName}...`);

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

    // Insert items
    const items = content.items.map((item) => ({
      dataset_name: datasetName,
      name: item.name,
      item_order: item.order ?? item.id
    }));

    const { error: itemsError } = await supabase
      .from('data_items')
      .insert(items);

    if (itemsError) {
      console.error(`Error inserting items for ${datasetName}:`, itemsError);
    } else {
      console.log(`✓ Migrated ${datasetName} (${content.items.length} items)`);
    }
  }

  console.log('Migration complete!');
}

migrateData().catch(console.error);