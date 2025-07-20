import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

const Page = () => {
    return (
        <div className="my-6 block space-y-4">
            <div className="flex items-center justify-between">
                <Heading
                    // title={`Categories (${categories.length})`} // TODO: Replace with actual count
                    title="Categories (10)"  
                    description="Manage categories for your store"
                />
                <Link href="/categories/new">
                <Button>
                    <Plus className="mr-2 h-4" /> Add New
                </Button>
                </Link>
            </div>
            <Separator />
            {/* <CategoriesClient data={formattedCategories} /> */}
        </div>
    );
};

export default Page;