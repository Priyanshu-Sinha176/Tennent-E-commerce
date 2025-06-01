"use client"

import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, generateTenantURL } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { CheckCheckIcon, LinkIcon, StarIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useState } from "react"
import { toast } from "sonner"
import {RichText} from "@payloadcms/richtext-lexical/react"

const CartButton = dynamic(() => import("../components/cart-button").then(
    (mod) => mod.CartButton
), { ssr: false })

interface ProductViewProps {
    productId: string
    tenantSlug: string
}

export const ProductView = ({ productId, tenantSlug }: ProductViewProps) => {

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ id: productId }))

    const [isCopied, setIsCopied] = useState(false)

    return (

        <div className="px-4 py-10 lg:px-12">

            <div className="border rounded-sm bg-white overflow-hidden">


                <div className="relative aspect-[3.9] border-b">

                    <Image src={data.image?.url || "/tennent.png"} alt={data.name || "Product Image"}
                        fill className="object-cover" />

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6">

                    <div className="col-span-4">

                        <div className="p-6">

                            <h1 className="text-4xl font-medium"> {data.name} </h1>

                        </div>

                        <div className="border-y flex">

                            <div className="px-6 py-4 flex items-center justify-center border-r">

                                <div className="px-2 py-1 border bg-pink-400 w-fit">

                                    <p className="text-base font-medium"> {formatCurrency(data.price)} </p>

                                </div>

                            </div>

                            <div className="px-6 py-4 flex items-center justify-center lg:border-r">

                                <Link href={generateTenantURL(tenantSlug)} className="flex items-center gap-2" >

                                    {data.tenant.image?.url && (

                                        <Image
                                            alt={data.tenant.name}
                                            src={data.tenant.image.url}
                                            width={33}
                                            height={33}
                                            className="rounded-full border shrink-0 size-[33px]"
                                        />

                                    )}

                                    <p className="text-base underline font-medium ml-3"> {data.tenant.name} </p>

                                </Link>

                            </div>

                            <div className="hidden lg:flex px-6 py-4 items-center justify-center">

                                <div className="flex items-center gap-1">

                                    < StarRating rating={data.reviewRating} iconClassName="size-4" />

                                    <p className="text-base font-medium ml-4"> {data.reviewCount} rating </p>

                                </div>

                            </div>

                        </div>

                        <div className="block lg:hidden px-6 py-4 items-center justify-center border-b">

                            <div className="flex items-center gap-1.5">

                                < StarRating rating={data.reviewRating} iconClassName="size-4" />

                                <p className="text-base font-medium"> {data.reviewCount} rating </p>

                            </div>

                        </div>

                        <div className="p-6">

                            {data.description ? (

                                < RichText data={data.description}/>
                                // <RichText data={JSON.parse(data.description)} />


                            ) : (

                                <p className="font-medium text-muted-foreground italic">

                                    No Description Provided

                                </p>

                            )}

                        </div>

                    </div>

                    <div className="col-span-2">

                        <div className="border-t lg:border-t-0 lg:border-l h-full">

                            <div className="flex flex-col gap-4 p-6 border-b">

                                <div className="flex flex-row items-center gap-2">

                                    <CartButton productId={productId} tenantSlug={tenantSlug} isPurchased={data.isPurchased} />

                                    <Button className="size-12"
                                        variant="elevated"
                                        onClick={() => {

                                            setIsCopied(true)
                                            navigator.clipboard.writeText(window.location.href);

                                            toast.success("URL copied to clipboard")

                                            setTimeout(() => { setIsCopied(false) }, 2000)

                                        }} disabled={isCopied}>

                                        {isCopied ? < CheckCheckIcon /> : < LinkIcon />}

                                    </Button>

                                </div>

                                <p className="text-center font-medium">

                                    {data.refundPolicy === "no-refund" ? "No Refund" : `${data.refundPolicy} money back guranteed`}

                                </p>

                            </div>

                            <div className="p-6">

                                <div className="flex items-center justify-between">

                                    <h3 className="text-xl font-medium"> Rating </h3>

                                    <div className="flex items-center font-medium gap-x-1">

                                        < StarIcon className="size-4 fill-black" />

                                        <p className="mr-1"> ({data.reviewRating}) </p>

                                        <p className="text-base"> {data.reviewCount} ratings </p>

                                    </div>

                                </div>

                                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">

                                    {[5, 4, 3, 2, 1].map((stars) => (

                                        <Fragment key={stars}>

                                            <div className="font-medium">

                                                {stars} {stars === 1 ? "star" : "stars"}

                                            </div>

                                            <Progress value={data.ratingDistribution[stars]} className="h-[1lh]" />

                                            <div className="font-medium"> {data.ratingDistribution[stars]}% </div>

                                        </Fragment>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export const ProductViewSkeleton = () => {

    return (

        <div className="px-4 py-10 lg:px-12">

            <div className="border rounded-sm bg-white overflow-hidden">


                <div className="relative aspect-[3.9] border-b">

                    <Image src="/tennent.png" alt="Product Image"
                        fill className="object-cover" />

                </div>

            </div>

        </div>

    )
}