import { DatasetMeta } from "@/types/data";
import { getSupabaseClient } from "@/lib/supabase";
import { isBuiltinDataset } from "@/lib/builtinDatasets";

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("datasets")
      .select("id, dataset_slug, title")
      .order("dataset_slug", { ascending: true });

    if (error) throw error;

    // Check which datasets are built-in
    const datasetsWithBuiltin = await Promise.all(
      (data || []).map(async (ds) => ({
        ...ds,
        is_builtin: await isBuiltinDataset(ds.dataset_slug)
      }))
    );

    return Response.json(datasetsWithBuiltin as DatasetMeta[]);
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      { error: "Failed to fetch datasets" },
      { status: 500 },
    );
  }
}
