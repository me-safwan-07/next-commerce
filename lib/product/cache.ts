import { revalidateTag } from "next/cache";

interface RevalidateProps {
    id?: string;
}

export const productCache = {
    tag: {
        byId(id: string) {
            return `product-${id}`;
        },
    },
    revalidate({ id }: RevalidateProps): void {
        if (id) {
            revalidateTag(this.tag.byId(id));
        }
    },
};