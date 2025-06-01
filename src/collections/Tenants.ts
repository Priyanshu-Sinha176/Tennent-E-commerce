import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: 'slug',
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Store Name",
            admin: {
                description: "The name of the store, e.g., 'My Store'.",
            }
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            index: true,
            access: { update: ({ req }) => isSuperAdmin(req.user), },
            admin: {
                description: " A unique identifier for the store, used in URLs. E.g - [slug].tenantbay.com ",
            }
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media"
        },
        {
            name: "stripeAccountId",
            type: "text",
            required: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
            admin: {
                readOnly: true,
                description: "Stripe account id associated with your shop"
            }
        },
        {
            name: "stripeDetailsSubmitted",
            type: "checkbox",
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
            admin: {
                description: "You cannot create products until you submit your Stripe details."
            }
        }
    ],
}
