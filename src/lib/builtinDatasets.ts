import fs from 'fs/promises';
import path from 'path';

let builtinDatasetSlugs: string[] | null = null;

export async function getBuiltinDatasetSlugs(): Promise<string[]> {
  if (builtinDatasetSlugs !== null) {
    return builtinDatasetSlugs;
  }

  try {
    const dataDir = path.join(process.cwd(), 'data');
    const files = await fs.readdir(dataDir);
    builtinDatasetSlugs = files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
      .sort();
    return builtinDatasetSlugs;
  } catch (error) {
    console.error('Failed to read built-in datasets:', error);
    return [];
  }
}

export async function isBuiltinDataset(slug: string): Promise<boolean> {
  const slugs = await getBuiltinDatasetSlugs();
  return slugs.includes(slug);
}
