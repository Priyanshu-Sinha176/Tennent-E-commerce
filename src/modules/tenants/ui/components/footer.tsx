import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import Link from "next/link"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
})

export const Footer = () => {

    return (

        <footer className="border-t font-medium bg-white">

            <div className="max-w-screen-xl mx-auto flex items-center gap-4 px-4 py-4 lg:px-12">

                <p> Powered by </p>

                <Link href="/">

                    <span className={cn("text-2xl font-semibold", poppins.className)}>

                        TenantBay

                    </span>

                </Link>

            </div>

        </footer>
    )
}