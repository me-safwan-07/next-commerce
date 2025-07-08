import { TProduct, TProductInput, ZProductInput } from "@/types/product";
import { validateInputs } from "../validate";
import { prisma } from "@/prisma";
import { productCache } from "./cache";
import { Prisma } from "@prisma/client";
import { DatabaseError } from "@/types/errors";

const selectProduct = {
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    description: true,
    price: true,
    status: true,
    category: true,
    stock: true,
    imageUrls: true,
};

export const createProduct = async (
    productInput: TProductInput
): Promise<TProduct> => {
    validateInputs([productInput, ZProductInput]);

    try {
        const product = await prisma.product.create({
            data: {
                ...productInput,
                imageUrls: productInput.imageUrls.map((img) => img.url),
            },
            select: selectProduct,
        });

        productCache.revalidate({
            id: product.id,
        });

        return product;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new DatabaseError(error.message);
        }
        throw error;
    }
};