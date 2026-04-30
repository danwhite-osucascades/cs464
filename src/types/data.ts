import { z } from 'zod'

export const ItemSchema = z.object({
    name: z.string().min(1, "Item name is required."),
    order: z.number().int().nonnegative(),
}) 

export const DatasetSchema = z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
    items: z.array(ItemSchema).min(10, "At least 10 items are required."),
})

export interface DatasetItem {
    name: string
    order: number
}

export interface DatasetDatabaseItem {
    item_name: string
    item_order: number
}

export interface Dataset<T = DatasetItem> {
    id: number
    dataset_slug?: string
    title: string
    description: string | null
    items: T[]
}


export interface DatasetMeta {
    id: number
    dataset_slug: string
    title: string
}
