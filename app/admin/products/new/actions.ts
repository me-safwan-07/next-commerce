"use server";

import { createProduct } from "@/lib/product/service";
import { TProduct, TProductInput } from "@/types/product";

export const CreateProductAction = async (data: TProductInput): Promise<TProduct> => {
    return await createProduct(data)
}