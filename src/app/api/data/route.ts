import path from "path";
import fs from "fs/promises"
import { DataEntry } from "@/types/data";

const DATA_DIRECTORY = path.join(process.cwd(), "public", "data");

export async function GET(request: Request) {
  const files = await fs.readdir(DATA_DIRECTORY)
  const data: DataEntry[] = []
  for(const file of files) {
    const filePath = path.join(DATA_DIRECTORY, file)
    // Skip directories
    const stat = await fs.stat(filePath)
    if(!stat.isFile()) continue
    // Skip non-JSON files
    if(path.extname(file) !== ".json") continue
    
    const fileData = await fs.readFile(filePath, "utf-8")
    data.push(JSON.parse(fileData) as DataEntry)
  }

  return Response.json(data)
}