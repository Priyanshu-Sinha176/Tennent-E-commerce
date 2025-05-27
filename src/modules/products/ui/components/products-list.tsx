"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useProductFilters } from "../../hooks/use-product-filters"
import { ProductCard, ProductCardSkeleton } from "./product-card"
import { DEFAULT_LIMIT } from "@/constants"
import { Button } from "@/components/ui/button"
import { InboxIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
    category?: string
    tenantSlug?: string
    narrowView?: boolean
}

export const ProductList = ({ category, tenantSlug, narrowView }: Props) => {

    const [filters] = useProductFilters()

    const apiFilters = {
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
        tags: filters.tags && filters.tags.length > 0 ? filters.tags : undefined,
        sort: filters.sort,
    }

    const trpc = useTRPC()
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
            {
                ...apiFilters,
                category,
                tenantSlug,
                limit: DEFAULT_LIMIT
            },
            {
                getNextPageParam: (lastPage) => {
                    return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
                }
            }
        ))

    if (data.pages?.[0]?.docs.length === 0) {
        return (

            <div className=
                "border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">

                <InboxIcon />

                <p className="text-base font-medium"> No Products Found </p>

            </div>

        )
    }

    return (

        <>

            <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
                narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
            )} >

                {data?.pages.flatMap((page) => page.docs).map((product) => (

                    < ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.image?.url}
                        price={product.price}
                        reviewRating={3}
                        reviewsCount={5}
                        tenantSlug={product.tenant?.slug}
                        tenantImageUrl={product.tenant?.image?.url}
                    />

                ))}

            </div>

            <div className="flex justify-center pt-8">

                {hasNextPage && (

                    <Button className="font-medium disabled:opacity-50 text-base bg-white"
                        variant="elevated" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>

                        Load More...

                    </Button>
                )}

            </div>

        </>
    )
}

export const ProductListSkeleton = ({ narrowView }: Props) => {
    return (

        <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
            narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )} >

            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (

                <ProductCardSkeleton key={index} />

            ))}

        </div>

    )
}