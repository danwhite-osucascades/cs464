import path from "path";
import fs from "fs/promises"
import { DataEntry } from "@/types/data";

const DATA_DIRECTORY = path.join(process.cwd(), "public", "data");

export async function GET(request: Request) {
  const files = await fs.readdir(DATA_DIRECTORY)
  const data: DataEntry[] = []
  for(const file of files) {
    const fileData = await fs.readFile(path.join(DATA_DIRECTORY, file), "utf-8")
    data.push(JSON.parse(fileData) as DataEntry)
  }

  return Response.json(data)
}