"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Poppins } from "next/font/google";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { registerSchema } from "../../schemas";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const SignUpView = () => {

    const trpc = useTRPC();
    const router = useRouter()

    const queryClient = useQueryClient()

    const register = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error( error.message );
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter()),
            router.push("/")
        },
    }))
    
    const form = useForm<z.infer<typeof registerSchema>>({

        mode: "all",
        resolver: zodResolver(registerSchema),

        defaultValues: {
            email: "",
            password: "",
            username: "",
        },

    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {

        register.mutate(values)
        console.log(registerSchema.shape.password);

    }

    const username = form.watch("username");
    const usernameErrors = form.formState.errors.username

    const showPreview = username && !usernameErrors

    return (

        <div className="grid grid-cols-1 lg:grid-cols-5">

            <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto" >

                <Form {...form}>

                    <form className="flex flex-col gap-8 p-4 lg:p-16" onSubmit={form.handleSubmit(onSubmit)} >

                        <div className="flex items-center justify-between mb-8">

                            <Link href="/" >

                                <span className={cn("text-2xl font-semibold", poppins.className)}>

                                    TenantBay

                                </span>

                            </Link>

                            <Button asChild variant="ghost" size="sm" className="text-base border-none underline">

                                <Link prefetch href="/sign-in">

                                    Sign in

                                </Link>

                            </Button>

                        </div>

                        <h1 className="text-4xl font-medium text-emerald-800">

                            Join Now!!! Thousands of creators are earning with us.

                        </h1>

                        < FormField name="username" render={({ field }) => (

                            <FormItem >

                                <FormLabel className=" text-base"> Username </FormLabel>

                                <FormControl>

                                    <Input {...field} />

                                </FormControl>

                                < FormDescription className={cn("hidden", showPreview && "block")}>

                                    Your Store will be available at&nbsp;

                                    <strong>{username}</strong>.shop.com

                                </FormDescription>

                                <FormMessage className="text-red-500" />

                            </FormItem>

                        )} />

                        < FormField name="email" render={({ field }) => (

                            <FormItem >

                                <FormLabel className=" text-base"> Email </FormLabel>

                                <FormControl>

                                    <Input {...field} />

                                </FormControl>

                                <FormMessage className="text-red-500" />

                            </FormItem>

                        )} />

                        < FormField name="password" render={({ field }) => (

                            <FormItem >

                                <FormLabel className=" text-base"> Password </FormLabel>

                                <FormControl>

                                    <Input {...field} type="password" />

                                </FormControl>

                                <FormMessage className="text-red-500" />

                            </FormItem>

                        )} />

                        <Button type="submit" size="lg" variant="elevated" disabled={register.isPending}
                            className="bg-black text-white hover:bg-pink-400 hover:text-primary" >

                            Create Account

                        </Button>

                    </form>

                </Form>

            </div>

            <div className="h-screen w-full lg:col-span-2 hidden lg:block"
                style={{
                    backgroundImage: "url('/tennent.png')",
                    backgroundSize: "cover", backgroundPosition: "center"
                }}
            />

        </div>
    );
}