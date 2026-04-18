import { getSupabaseClient } from "@/lib/supabase"
import { DatasetTitle } from "@/types/data"
import { NextRequest } from "next/server"

const DEFAULT_LIMIT = 100
const MAX_LIMIT = 1000
const MIN_LIMIT = 1

/**
 * GET `/api/data/titles`  
 * Retrieve a list of dataset titles with pagination support. Optionally accepts the following query parameters:
 * - `limit`: The maximum number of dataset titles to return (default: 100, max: 1000).
 * - `cursor`: The ID of the last dataset title from the previous page (for pagination). If not provided, starts from the beginning.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = Math.min(Math.max(Number(searchParams.get('limit')) || DEFAULT_LIMIT, MIN_LIMIT), MAX_LIMIT)
  const cursor = Number(searchParams.get('cursor')) || null

  const supabase = getSupabaseClient()

  let query = await supabase
    .from('datasets')
    .select('id, dataset_slug, title')
    .gt('id', cursor ?? -1)
    .order('id', { ascending: true })
    .limit(limit)

  if (query.error) {
    return Response.json({ 
      error: query.error.message 
    }, { status: 500 })
  }

  const datasets = query.data as DatasetTitle[]
  const nextCursor = datasets.length >= limit ? datasets[datasets.length - 1].id : null
  return Response.json({ titles: datasets, nextCursor })
}