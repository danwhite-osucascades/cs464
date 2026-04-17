import * as fs from 'fs';
import * as path from 'path';

// Define types to ensure your JSON matches the DB schema
interface Item {
  name: string;
  order: number;
}

interface ThemeList {
  title: string;
  description: string;
  items: Item[];
}

const jsonDirectory = path.join(process.cwd(), 'data/');
const seedPath = path.join(process.cwd(), 'supabase/seed.sql');

// Add this near the top where you define jsonDirectory
if (!fs.existsSync(jsonDirectory)) {
    console.error(`❌ Error: The directory ${jsonDirectory} does not exist.`);
    console.log(`💡 Solution: Run 'mkdir -p data/' and add your JSON files there.`);
    process.exit(1);
}

const files = fs.readdirSync(jsonDirectory).filter(f => f.endsWith('.json'));

let sqlOutput = `-- Generated Seed Data\n\n`;

files.forEach(file => {
  const rawData = fs.readFileSync(path.join(jsonDirectory, file), 'utf8');
  const data: ThemeList = JSON.parse(rawData);
  
  // Escaping single quotes for SQL
  const cleanTitle = data.title.replace(/'/g, "''");
  const cleanDesc = data.description.replace(/'/g, "''");
  sqlOutput += `INSERT INTO lists (title, description) \nVALUES ('${cleanTitle}', '${cleanDesc}') \nRETURNING id INTO list_id;\n\n`;

  data.items.forEach((item, i) => {
    const cleanName = item.name.replace(/'/g, "''");
    const order = item.order ?? (i + 1);
    sqlOutput += `INSERT INTO items (list_id, name, display_order) \nVALUES (list_id, '${cleanName}', ${order});\n`;
  });
  
  sqlOutput += `\n-- End of ${data.title}\n\n`;
});

const finalSql = `DO $$\nDECLARE\n  list_id uuid;\nBEGIN\n${sqlOutput}END $$;`;

fs.writeFileSync(seedPath, finalSql);
console.log('✅ seed.sql generated successfully from TypeScript!');
