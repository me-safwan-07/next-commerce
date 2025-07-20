import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { IconCurrencyRupeeNepalese } from "@tabler/icons-react";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Overview } from "../components/overview";

// TODO: remove after get the graph data
const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 800 },
  { name: 'Apr', total: 1600 },
  { name: 'May', total: 900 },
  { name: 'Jun', total: 1700 },
  { name: 'Jul', total: 2300 },
  { name: 'Aug', total: 2000 },
  { name: 'Sep', total: 1800 },
  { name: 'Oct', total: 2200 },
  { name: 'Nov', total: 1500 },
  { name: 'Dec', total: 2500 },
];


export default async function DashboardPage() {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-4">
                <Heading title="Dashboard" description="Overview of your store" />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatter.format(100000)} {/* TODO: add the totalRevenue */}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">
                                Sales
                            </CardTitle>
                            <CreditCard  className="h-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{100}</div> {/* TODO: add the salescount data*/}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Products In Stock
                            </CardTitle>
                            <Package className="h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{40}</div> {/* TODO: add the stock count data*/}
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={data} /> {/* TODO: add the graph Revenue data*/}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
};