import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import { lexicalEditor, UploadFeature } from "@payloadcms/richtext-lexical";
import { Check } from "lucide-react";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {

    slug: "products",

    access: {
        read: () => true,
        create: ({req}) => {

            if(isSuperAdmin(req.user)) return true

            const tenant = req.user?.tenants?.[0]?.tenant as Tenant

            return Boolean(tenant?.stripeDetailsSubmitted)

        },
        delete: ({req}) => isSuperAdmin(req.user)
    },

    admin: {
        useAsTitle: "name",
        description: "You must verify account before creating  products"
    },

    fields: [

        {
            name: "name",
            type: "text",
            required: true
        },

        {
            name: "description",
            type: "richText"
        },

        {
            name: "price",
            type: "number",
            required: true,
            admin: {
                description: "Price in INR"
            }
        },

        {
            name: "category",
            type: "relationship",
            relationTo: "categories",
            hasMany: false
        },

        {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true
        },

        {
            name: "image",
            type: "upload",
            relationTo: "media"
        },

        {
            name: "refundPolicy",
            type: "select",
            options:[ "30-day" , "14-day" , "7-day" , "3-day" , "1-day" , "no-refund" ],
            defaultValue: "30-day"
        },

        {
            name: "content",
            type: "richText",
            editor: lexicalEditor({
                features: ({defaultFeatures}) => [ ...defaultFeatures, UploadFeature({
                    collections: {
                        media: {
                            fields:[
                                {
                                    name: "alt",
                                    type: "text"
                                }
                            ]
                        }
                    }
                })]
            }),
            admin: { description: "Protected content, only visible after purchase" }
        },

        {
            name: "isArchived",
            label: "Archive",
            defaultValue: false,
            type: "checkbox",
            admin: { description: "Check if you want to hide this products" }
        },

        {
            name: "isPrivate",
            label: "Private",
            defaultValue: false,
            type: "checkbox",
            admin: { description: "If checked, this Product will not be shown on the public storefront" }
        }

    ]
}