import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
	try {
		const dataDirectoryName: string = 'sample_data';
		const dataDirectory: string = path.join(process.cwd(), dataDirectoryName);
		const filenames: string[] = await fs.readdir(dataDirectory);
		const allJsonData = {};
	
		for (const filename of filenames) {
			if (path.extname(filename) === '.json') {
				const filePath: string = path.join(dataDirectory, filename);
				const jsonData = await fs.readFile(filePath, 'utf8');
				const key: string = path.parse(filename).name;
				allJsonData[key] = JSON.parse(jsonData);
			}
		}
		
		return NextResponse.json(allJsonData);
	}
	catch (error) {
		return NextResponse.json(
			{ status: 500, error: error.message }
		);
	}

}
