import { supabase } from '@/lib/supabase'
import { DataFile } from '@/types/data'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')

    // query param containing name -> return specified file
    if (name) {
        try {
            // Get dataset info
            const { data: dataset, error: datasetError } = await supabase
                .from('datasets')
                .select('title, description')
                .eq('name', name)
                .single()

            if (datasetError || !dataset) {
                return Response.json({ error: `No dataset found for ${name}` }, { status: 404 })
            }

            // Get items
            const { data: items, error: itemsError } = await supabase
                .from('data_items')
                .select('name, item_order')
                .eq('dataset_name', name)
                .order('item_order')

            if (itemsError) {
                return Response.json({ error: `Error fetching items for ${name}` }, { status: 500 })
            }

            const dataFile: DataFile = {
                title: dataset.title,
                description: dataset.description,
                items: items.map(item => ({
                    name: item.name,
                    order: item.item_order
                }))
            }

            return Response.json(dataFile)
        } catch (error) {
            return Response.json({ error: `No dataset found for ${name}` }, { status: 404 })
        }
    }

    // no query param - return all datasets
    try {
        // Get all datasets
        const { data: datasets, error: datasetsError } = await supabase
            .from('datasets')
            .select('name, title, description')

        if (datasetsError) {
            return Response.json({ error: 'Error fetching datasets' }, { status: 500 })
        }

        const allData: Record<string, DataFile> = {}

        // For each dataset, get its items
        for (const dataset of datasets) {
            const { data: items, error: itemsError } = await supabase
                .from('data_items')
                .select('name, item_order')
                .eq('dataset_name', dataset.name)
                .order('item_order')

            if (itemsError) {
                console.error(`Error fetching items for ${dataset.name}:`, itemsError)
                continue
            }

            allData[dataset.name] = {
                title: dataset.title,
                description: dataset.description,
                items: items.map(item => ({
                    name: item.name,
                    order: item.item_order
                }))
            }
        }

        return Response.json({ datasets: allData })
    } catch (error) {
        return Response.json({ error: 'Error fetching data' }, { status: 500 })
    }
}
