"use client"

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import CategoriesSidebar from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    data: CustomCategory;
    disable?: boolean;
}

export const SearchInput = ({ disable, data }: Props) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (

        <div className="flex items-center w-full ">

            <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

            <div className="relative w-full">

                <SearchIcon className=
                    "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />

                <Input placeholder="Search Products" disabled={disable} className="pl-10" />

            </div>

            < Button variant="elevated" className=" size-12 shrink-0 flex lg:hidden "
                onClick={() => setIsSidebarOpen(true)} >

                <ListFilterIcon />

            </Button>

        </div>

    )
}