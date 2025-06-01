import type { SearchParams } from "nuqs/server"
import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { ProductListViews } from "@/modules/products/ui/views/product-list-view";
import { loadProductFilters } from "@/modules/products/searchParams";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
    searchParams: Promise<SearchParams>
    params: Promise<{ slug: string }>
}

const Page = async ( { searchParams , params } : Props) => {

    const { slug } = await params;
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();

    const safeFilters = {
    ...filters,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
  };

    void queryClient.prefetchInfiniteQuery( trpc.products.getMany.infiniteQueryOptions({
        ...safeFilters, tenantSlug: slug, limit: DEFAULT_LIMIT 
    }) )

    return(

        <HydrationBoundary state={dehydrate(queryClient)}>

            <ProductListViews tenantSlug={slug} narrowView/>

        </HydrationBoundary>
    )
}

export default Page