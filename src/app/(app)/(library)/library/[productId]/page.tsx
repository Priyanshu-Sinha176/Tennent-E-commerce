import { ProductView, ProductViewSkeleton } from '@/modules/library/ui/views/product-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

interface Props {
    params: Promise<{ productId: string }>
}

export const dynamic = "force-dynamic"

const Page = async ({ params }: Props) => {

    const queryClient = getQueryClient()
    const { productId } = await params

    void queryClient.prefetchQuery(trpc.library.getOne.queryOptions({
        productId
    }))

    void queryClient.prefetchQuery(trpc.reviews.getOne.queryOptions({
        productId
    }))

    return (
        <div>

            < HydrationBoundary state={dehydrate(queryClient)}>

                <Suspense fallback={<ProductViewSkeleton />}>

                    < ProductView productId={productId} />

                </Suspense>

            </HydrationBoundary>

        </div>
    );
}

export default Page;
