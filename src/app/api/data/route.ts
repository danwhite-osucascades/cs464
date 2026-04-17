import { supabase } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'
import { DataFile, DataItem } from '@/types/data'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')

    if (name) {
        const { data, error } = await supabase
            .from('lists')
            .select(`
                title,
                description,
                items (
                    name,
                    display_order
                )
            `)
            .ilike('title', name)
            .single()

        if (error || !data) {
            return NextResponse.json({ error: `No dataset found for ${name}` }, { status: 404 })
        }
	
	const response: DataFile = {
	    title: data.title,
	    description: data.description,
	    items: data.items.map((item: any) => ({
                name: item.name,
                order: item.display_order
            })).sort((a: DataItem, b: DataItem) => a.order - b.order)
	}

        return NextResponse.json(data)
    }

    const { data, error } = await supabase
        .from('lists')
        .select(`
            id,
            title,
            description,
            items (
                name,
                display_order
            )
        `)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const allData = data.reduce((acc: any, list: any) => {
        const key = list.title.toLowerCase().replace(/\s+/g, '-')
        acc[key] = {
            title: list.title,
            description: list.description,
            items: list.items
	        .map((item: any) => ({
                    name: item.name,
                    order: item.display_order
                }))
                .sort((a: any, b: any) => a.display_order - b.display_order)
        }
        return acc
    }, {})

    return NextResponse.json({ datasets: allData })
}
