"use client"

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import CategoriesSidebar from "./categories-sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";

interface Props {
    disable?: boolean;
}

export const SearchInput = ({ disable }: Props) => {

    const [filters, setFilters] = useProductFilters()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [searchValue, setSearchValues] = useState(filters.search)

    const trpc = useTRPC()
    const session = useQuery(trpc.auth.session.queryOptions())

    useEffect(() => {
        const timeoutId = setTimeout(() => { setFilters({ search: searchValue }) }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchValue, setFilters])

    return (

        <div className="flex items-center w-full ">

            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

            <div className="relative w-full">

                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />

                <Input placeholder="Search Products" disabled={disable} className="pl-10" value={searchValue}
                    onChange={(e) => setSearchValues(e.target.value)} />

            </div>

            < Button variant="elevated" className=" size-12 shrink-0 flex lg:hidden " onClick={() => setIsSidebarOpen(true)} >

                <ListFilterIcon />

            </Button>

            {session.data?.user && (

                <Link prefetch href="/library" passHref >

                    <Button variant="elevated" className="ml-4">

                        <BookmarkCheckIcon />

                        Library

                    </Button>

                </Link>

            )}

        </div>

    )
}