import { Dataset, DatasetDatabaseItem, DatasetSchema } from '@/types/data'
import { getSupabaseClient } from '@/lib/supabase'

export async function POST(request: Request) {
    try {
        const body = await request.json();
	// parses the body via the schema defined in /types/data
	const validation = DatasetSchema.safeParse(body);
	if (!validation.success) {
	    return Response.json(validation.error.format(), {status: 400})
	}
        const { title, description, items } = validation.data;
            const slug = title
	    .toLowerCase()
	    .trim()
	    .replace(/[^\w\s-]/g, '')
	    .replace(/[\s_-]+/g, '-')
	    .replace(/^-+|-+$/g, '')
	const supabase = getSupabaseClient() 
	const { data: dataset, error: datasetError } = await supabase
	    .from('datasets')
	    .insert([{
	        title,
		description,
		dataset_slug: slug
	    }])
	    .select()
	    .single()
	if (datasetError) {
	    if (datasetError.code === '23505') {
	        return Response.json({ error: "A dataset with this title/slug already exists" }, { status: 409 })
	    }
	    throw datasetError
	}
	const itemsToInsert = items.map((item) => ({
            dataset_id: dataset.id,
            item_name: item.name,
            item_order: item.order,
        }));
	const { error: itemsError } = await supabase
            .from('dataset_items')
            .insert(itemsToInsert)
	if (itemsError) {
        // If items fail, you might want to delete the parent dataset (Manual Rollback)
            await supabase.from('datasets').delete().eq('id', dataset.id)
            throw itemsError;
        }
        const response = {
            id: Number(dataset.id), 
            dataset_slug: dataset.dataset_slug,
            title: dataset.title,
            description: dataset.description,
            items: items
        };
        return Response.json({ links: `/api/data?name=${dataset.title}`}, { status: 201 })
    } catch (error: any) {
        console.error("Database Error:", error)
	return Response.json({ error: "Internal server error."}, { status: 500})
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')

    try {
        const supabase = getSupabaseClient()

        // query param containing name -> return specified dataset
        if (name) {
            const { data: datasetData, error: datasetError } = await supabase
                .from('datasets')
                .select('id, dataset_slug, title, description')
                .eq('dataset_slug', name)
                .single()

            const dataset = datasetData as Dataset | null

            if (datasetError || !dataset) {
                return Response.json({ error: `No dataset found for ${name}` }, { status: 404 })
            }

            const { data: itemsData, error: itemsError } = await supabase
                .from('dataset_items')
                .select('item_name, item_order')
                .eq('dataset_id', dataset.id)
                .order('item_order', { ascending: true })

            const items = (itemsData || []) as DatasetDatabaseItem[]

            if (itemsError) {
                throw itemsError
            }

            const dataFile: Dataset = {
                id: dataset.id,
                title: dataset.title,
                description: dataset.description || '',
                items: (items || []).map(item => ({
                    name: item.item_name,
                    order: item.item_order
                }))
            }

            return Response.json(dataFile)
        }

        // no query param -> return all datasets
        const { data: datasetsData, error: datasetsError } = await supabase
            .from('datasets')
            .select('id, dataset_slug, title, description')
            .order('dataset_slug', { ascending: true })

        const datasets = (datasetsData || []) as Dataset[]

        if (datasetsError) {
            throw datasetsError
        }

        const allData: Record<string, Dataset> = {}

        // fetch items for each dataset
        for (const dataset of datasets || []) {
            const { data: itemsData, error: itemsError } = await supabase
                .from('dataset_items')
                .select('item_name, item_order')
                .eq('dataset_id', dataset.id)
                .order('item_order', { ascending: true })

            const items = (itemsData || []) as DatasetDatabaseItem[]

            if (itemsError) {
                throw itemsError
            }

            allData[dataset.dataset_slug ?? ""] = {
                id: dataset.id,
                title: dataset.title,
                description: dataset.description || '',
                items: (items || []).map(item => ({
                    name: item.item_name,
                    order: item.item_order
                }))
            }
        }

        return Response.json({ datasets: allData })
    } catch (error) {
        console.error('Database error:', error)
        return Response.json({ error: 'Failed to fetch datasets' }, { status: 500 })
    }
}
