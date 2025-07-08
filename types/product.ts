import { z } from "zod";

export const ZProductInput = z.object({
    imageUrls: z.array(
        z.object({
            url: z.string().url().min(1, {
                message: 'minimum one document is required',
            })
        })
    ),
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters."
    }),
    description: z.string().min(10, {
        message: 'Product description must be at least 10 characters',
    }),
    price: z.number(),
    category: z.string(),
    stock: z.number(),
    status: z.string(),
});

export type TProductInput = z.infer<typeof ZProductInput>;

export const ZProduct = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    imageUrls: z.array(
        z.object({
            url: z.string().url()
        })
    ),
    description: z.string().min(10, {
        message: 'Product description must be at least 10 characters',
    }),
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters."
    }),
    price: z.number(),
    category: z.string(),
    stock: z.number(),
    status: z.string(),
});

export type TProduct = z.infer<typeof ZProduct>;