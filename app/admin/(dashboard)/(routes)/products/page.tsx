import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/prisma"
import { Plus } from "lucide-react"
import Link from "next/link"

const ProductPage = async () => {
   // const products = await prisma.product.findMany({
   //    include: {
   //       orders: true,
   //       // categories: true,
   //       brand: true,
   //    },
   //    orderBy: {
   //       createdAt: 'desc',
   //    },
   // })
   return (
      <div className="block space-y-4 my-6">
         <div className="flex items-center justify-between">
            <Heading
               title={`Products (10)`}
               description="Manage products for your store"
            />
            <Link href="/admin/products/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         {/* <ProductsTable data={formattedProducts} /> */}
      </div>
   );
};

export default ProductPage;