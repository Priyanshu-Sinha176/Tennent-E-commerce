"use client"

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";
import { TagsFilter } from "./tags-filter";

interface Props {
    title: string;
    className?: string;
    children: React.ReactNode;
}

const ProductFilters = ({ title, className, children }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon

    return (
        <div className={cn("p-4 border-b flex flex-col gap-2", className)}>

            <div className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen((current) => !current)}>

                <p className="font font-medium">{title}</p>

                <Icon className="size-5" />

            </div>

            {isOpen && children}

        </div>
    )
}

export const ProductFilter = () => {

    const [filters, setFilters] = useProductFilters()

    const hasAnyFilters = Object.entries(filters).some(([key, value]) => {

        if (key === "sorts") return false

        if (Array.isArray(value)) {
            return value.length > 0
        }

        if (typeof value === "string") {
            return value !== ""
        }

        return value !== null

    })

    const onClear = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            tags: [],
        })
    }

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({ ...filters, [key]: value })
    }

    return (

        <div className="border rounded-md bg-white">

            <div className="p-4 border-b flex items-center justify-between">

                <p className="font font-medium"> filters</p>

                {hasAnyFilters && (

                    <button className="underline cursor-pointer" type="button" onClick={() => onClear()}>
                        clear
                    </button>

                )}

            </div>

            <ProductFilters  title="Price">

                <PriceFilter minPrice={filters.minPrice} maxPrice={filters.maxPrice}
                    onMinPriceChange={(value) => onChange("minPrice", value)}
                    onMaxPriceChange={(value) => onChange("maxPrice", value)} />

            </ProductFilters>

            <ProductFilters className="border-b-0" title="Tags">

                <TagsFilter value={filters.tags} onChange={(value) => onChange("tags", value)} />

            </ProductFilters>

        </div>

    )
}