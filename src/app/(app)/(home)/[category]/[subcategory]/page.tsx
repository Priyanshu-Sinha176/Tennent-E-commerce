import { DEFAULT_LIMIT } from '@/constants';
import { loadProductFilters } from '@/modules/products/searchParams';
import { ProductListViews } from '@/modules/products/ui/views/product-list-view';
import { caller, getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SearchParams } from 'nuqs/server';

interface Props {
    params: Promise<{
        subcategory: string
    }>,
    searchParams: Promise<SearchParams>
}

const page = async ({ params , searchParams }: Props) => {

    const { subcategory } = await params
    const filters = await loadProductFilters(searchParams)

    const apiFilters = {
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
    }

    const queryClient = getQueryClient()
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        { ...apiFilters , category: subcategory, limit: DEFAULT_LIMIT }))

    return (

        <HydrationBoundary state={dehydrate(queryClient)}>

            < ProductListViews category={ subcategory } />

        </ HydrationBoundary >

    )
}

export default page
