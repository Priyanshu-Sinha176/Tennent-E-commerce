"use client"

import { Category } from "@/payload-types"
import { CategoryDropdown } from "./category-dropdown"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ListFilterIcon } from "lucide-react"
import CategoriesSidebar from "./categories-sidebar"

interface Props {
    data: any,
}

export const Categories = ({ data }: Props) => {

    const containerRef = useRef<HTMLDivElement>(null)
    const measureRef = useRef<HTMLDivElement>(null)
    const viewAllRef = useRef<HTMLDivElement>(null)

    const [visibleCount, setVisibleCount] = useState(data.length)
    const [isAnyHovered, setIsAnyHovered] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const activeCategory = "all"

    const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory)
    const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1

    useEffect(() => {

        const calculateVisibleCount = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return

            const containerWidth = containerRef.current.offsetWidth
            const viewAllWidth = viewAllRef.current.offsetWidth
            const availableWidth = containerWidth - viewAllWidth

            const items = Array.from(containerRef.current.children)
            let totalWidth = 0
            let visible = 0

            for (const item of items) {
                const width = item.getBoundingClientRect().width

                if (totalWidth + width > availableWidth) {
                    break
                }

                totalWidth += width
                visible++

            }

            setVisibleCount(visible)
        }

        const resizeObserver = new ResizeObserver(calculateVisibleCount)
        resizeObserver.observe(containerRef.current!)

        return () => {
            resizeObserver.disconnect()
        }

    }, [data.length])

    return (

        <div className="relative w-full">

            < CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} data={data}/>

            { /* invisible div to measure the width of the items */}

            <div ref={measureRef} style={{ position: "fixed", top: -9999, left: -999 }}
                className="absolute opacity-0 pointer-events-none flex">

                {data.map((category: Category) => (

                    <div key={category.id}>

                        < CategoryDropdown

                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={false}

                        />

                    </div>

                ))}

            </div>

            { /* visible div to show the items */}

            <div ref={containerRef} className=" flex flex-nowrap items-center"
                onMouseEnter={() => setIsAnyHovered(true)}
                onMouseLeave={() => setIsAnyHovered(false)}>

                {data.slice(0, visibleCount).map((category: Category) => (

                    <div key={category.id}>

                        < CategoryDropdown

                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={isAnyHovered}

                        />

                    </div>

                ))}

                <div ref={viewAllRef} className="shrink-0" >

                    <Button className={cn(
                        "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                        isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary",
                    )}
                        onClick={() => setIsSidebarOpen(true)}
                    >

                        View All

                        < ListFilterIcon className="ml-2" size={22} />

                    </Button>

                </div>

            </div>

        </div>

    )
}