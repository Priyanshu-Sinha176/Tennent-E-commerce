import { CustomCategory } from "../types"
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    data: CustomCategory
}

export default function CategoriesSidebar({ open, onOpenChange, data }: Props) {

    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null)
    const [selectedCategory, setselectedCategory] = useState<CustomCategory[] | null>(null)

    const currentCategories = parentCategories ?? data ?? []
    const router = useRouter()

    const handleOpenChange = (open: boolean) => {

        setParentCategories(null)
        setselectedCategory(null)
        onOpenChange(open)

    }

    const handleCategoryClick = (category: CustomCategory) => {

        if (category.subcategories && category.subcategories.length > 0) {

            setParentCategories(category.subcategories as CustomCategory[])
            setselectedCategory(category)

        }

        else {

            if (parentCategories && selectedCategory) {

                router.push(`/${selectedCategory.slug}/${category.slug}`)

            }
            else {

                if (category.slug === "all") {

                    router.push("/")

                }
                else {

                    router.push(`/${category.slug}`)

                }
            }

            handleOpenChange(false)

        }
    }

    const backgroundColor = selectedCategory?.color || "white"

    const handleBackClick = () => {

        if (parentCategories) {
            setParentCategories(null)
            setselectedCategory(null)
        }
    }


    return (

        <Sheet open={open} onOpenChange={handleOpenChange}>

            <SheetContent side="left" className="p-0 transition-none" style={{ backgroundColor }}>

                <SheetHeader className="p-4 border-b">

                    <SheetTitle>

                        Category sidebar

                    </SheetTitle>

                </SheetHeader>

                <ScrollArea>

                    {parentCategories && (

                        <button onClick= {handleBackClick} className=
                            "w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer" >

                            <ChevronLeftIcon className="mr-2 size-4" />

                            Back

                        </button>

                    )}

                    {currentCategories.map((category) => (

                        <button key={category.slug} onClick={ () => handleCategoryClick(category) } className=
                            "w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer" >

                            {category.name}

                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className="ml-2 size-4" />
                            )}


                        </button>

                    ))}

                </ScrollArea>

            </SheetContent>

        </Sheet>

    )
}