import PageContainer from "@/components/layout/page-container";
import FormCardSkeleton from "@/components/skeleton/product-card-skeleton";
import { Suspense } from "react";
import { NewProductForm } from "./components/new-Product-form";


export const metadata = {
    title: 'Admmin-dashboard: Notes View'
};

export default async function Page() {
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                <Suspense fallback={<FormCardSkeleton />}>
                    <NewProductForm pageTitle="Create New Product" />
                </Suspense>
            </div>
        </PageContainer>
    )
}