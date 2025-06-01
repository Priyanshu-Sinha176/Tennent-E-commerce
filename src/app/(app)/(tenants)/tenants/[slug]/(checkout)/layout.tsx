import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar } from "@/modules/checkout/ui/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

const Layout = async ({ children, params }: Props) => {

    const { slug } = await params
    const queryClient = getQueryClient()

    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }))

    return (

        <div className="min-h-screen bg-[#F4F4F0] flex flex-col">

            < Navbar slug={slug} />

            <div className="flex-1">

                <div className="min-w-screen-xl mx-auto">

                    {children}

                </div>

            </div>

            < Footer />

        </div>
    )

}

export default Layout