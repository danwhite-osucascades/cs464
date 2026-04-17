import * as fs from 'fs';
import * as path from 'path';

import { DataFile, DataItem } from '../src/types/data'; 

const jsonDirectory = path.join(process.cwd(), 'data/');
const seedPath = path.join(process.cwd(), 'supabase/seed.sql');

if (!fs.existsSync(jsonDirectory)) {
    console.error(`❌ Error: The directory ${jsonDirectory} does not exist.`);
    console.log(`💡 Solution: Run 'mkdir -p data/' and add your JSON files there.`);
    process.exit(1);
}

const files = fs.readdirSync(jsonDirectory).filter(f => f.endsWith('.json'));

let sqlOutput = `-- Generated Seed Data (Sync with DataFile Interface)\n\n`;

files.forEach(file => {
    const rawData = fs.readFileSync(path.join(jsonDirectory, file), 'utf8');
    const data: DataFile = JSON.parse(rawData);
    
    const cleanTitle = data.title.replace(/'/g, "''");
    const cleanDesc = data.description.replace(/'/g, "''");

    sqlOutput += `INSERT INTO lists (title, description) \nVALUES ('${cleanTitle}', '${cleanDesc}') \nRETURNING id INTO list_id;\n\n`;

    data.items.forEach((item: DataItem, i: number) => {
        const cleanName = item.name.replace(/'/g, "''");
        
        const orderValue = item.order ?? (i + 1);

        sqlOutput += `INSERT INTO items (list_id, name, display_order) \nVALUES (list_id, '${cleanName}', ${orderValue});\n`;
    });
    
    sqlOutput += `\n-- End of ${data.title}\n\n`;
});

const finalSql = `DO $$\nDECLARE\n  list_id uuid;\nBEGIN\n${sqlOutput}END $$;`;

fs.writeFileSync(seedPath, finalSql);
console.log('✅ seed.sql generated successfully using DataFile interfaces!');
