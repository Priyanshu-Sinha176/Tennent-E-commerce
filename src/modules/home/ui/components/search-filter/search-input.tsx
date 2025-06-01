"use client"

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import CategoriesSidebar from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
    disable?: boolean;
}

export const SearchInput = ({ disable }: Props) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const trpc = useTRPC()
    const session = useQuery(trpc.auth.session.queryOptions())

    return (

        <div className="flex items-center w-full ">

            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

            <div className="relative w-full">

                <SearchIcon className=
                    "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />

                <Input placeholder="Search Products" disabled={disable} className="pl-10" />

            </div>

            < Button variant="elevated" className=" size-12 shrink-0 flex lg:hidden "
                onClick={() => setIsSidebarOpen(true)} >

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