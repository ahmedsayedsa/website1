import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";

export default defineConfig({
    branch,

    // Get this from tina.io
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    token: process.env.TINA_TOKEN,

    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        tina: {
            mediaRoot: "uploads",
            publicFolder: "public",
        },
    },
    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
    schema: {
        collections: [
            {
                name: "package",
                label: "Packages",
                path: "content/packages",
                format: "json",
                fields: [
                    {
                        type: "string",
                        name: "titleEn",
                        label: "Title (English)",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "titleAr",
                        label: "Title (Arabic)",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "descriptionEn",
                        label: "Description (English)",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "string",
                        name: "descriptionAr",
                        label: "Description (Arabic)",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "number",
                        name: "price",
                        label: "Price (EGP)",
                        required: true,
                    },
                    {
                        type: "number",
                        name: "duration",
                        label: "Duration (Days)",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "category",
                        label: "Category",
                        options: ["domestic", "international", "hajj", "umrah"],
                    },
                    {
                        type: "image",
                        name: "featuredImage",
                        label: "Featured Image",
                    },
                    {
                        type: "boolean",
                        name: "published",
                        label: "Published",
                    },
                ],
            },
            {
                name: "blog",
                label: "Blog Posts",
                path: "content/blog",
                format: "mdx",
                fields: [
                    {
                        type: "string",
                        name: "titleEn",
                        label: "Title (English)",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "titleAr",
                        label: "Title (Arabic)",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "slug",
                        label: "Slug",
                        required: true,
                    },
                    {
                        type: "rich-text",
                        name: "contentEn",
                        label: "Content (English)",
                        isBody: true,
                    },
                    {
                        type: "rich-text",
                        name: "contentAr",
                        label: "Content (Arabic)",
                    },
                    {
                        type: "image",
                        name: "featuredImage",
                        label: "Featured Image",
                    },
                    {
                        type: "boolean",
                        name: "published",
                        label: "Published",
                    },
                    {
                        type: "datetime",
                        name: "publishedAt",
                        label: "Published Date",
                    },
                ],
            },
            {
                name: "settings",
                label: "Site Settings",
                path: "content/settings",
                format: "json",
                ui: {
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                fields: [
                    {
                        type: "string",
                        name: "siteName",
                        label: "Site Name",
                    },
                    {
                        type: "string",
                        name: "contactEmail",
                        label: "Contact Email",
                    },
                    {
                        type: "string",
                        name: "whatsapp",
                        label: "WhatsApp Number",
                    },
                    {
                        type: "image",
                        name: "logo",
                        label: "Site Logo",
                    },
                ],
            },
        ],
    },
});
