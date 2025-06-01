import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { SearchParams } from 'nuqs/server';
import { loadProductFilters } from '@/modules/products/searchParams';
import { ProductListViews } from '@/modules/products/ui/views/product-list-view';
import { DEFAULT_LIMIT } from '@/constants';

interface Props {
    params: Promise<{
        category: string
    }>,
    searchParams: Promise<SearchParams>
}

export const dynamic = "force-dynamic"

const page = async ({ params, searchParams }: Props) => {

    const { category } = await params
    const filters = await loadProductFilters(searchParams)

    const apiFilters = {
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
    }

    const queryClient = getQueryClient()
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        { ...apiFilters, category, limit: DEFAULT_LIMIT }))

    return (

        <HydrationBoundary state={dehydrate(queryClient)}>

            < ProductListViews category={category} />

        </ HydrationBoundary >

    )
}

export default page
