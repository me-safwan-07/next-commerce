'use client';

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { TProduct, TProductInput, ZProductInput } from "@/types/product";
import { categories } from "@/lib/data";
import { FileUploader } from "@/components/file-uploader";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Categorys, Status } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CreateProductAction } from "../actions";
import { useRouter } from "next/navigation";

interface NewProductFormProps {
    pageTitle?: string;
}

export const NewProductForm = ({
    pageTitle= 'Create New Notes',
}: NewProductFormProps) => {
    const router = useRouter();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(ZProductInput),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            price: 0,
            stock: 0,
            status: "",
            imageUrls: [],
        }
    });

    const onSubmit = async (values: TProductInput) => {
        try {
            setIsSubmitting(true);

            const dataToSubmit = {
                ...values,
                imageUrls: imageUrls.map(url => ({ url })),
            };

            console.log(dataToSubmit);

            const response: TProduct = await CreateProductAction(dataToSubmit);

            if (!response) {
                throw new Error("Failed to create product");
            }

            toast({
                title: "Success",
                description: "Product created Successfully!",
                variant: "default",
            });

            router.push('/admin/products');
        } catch (error) {
          toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle className="text-left text-2xl font-bold">
                    {pageTitle}
                </CardTitle>
            </CardHeader>
            <CardHeader>
                <Form { ...form }>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Product Image Upload */}
                        <FormField 
                            control={form.control}
                            name='imageUrls'
                            render={() => (
                                <div className="space-y-6">
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <FileUploader 
                                                onUpload={async (urls) => {
                                                    setImageUrls([...imageUrls, ...urls]);
                                                    console.log(urls)
                                                    return Promise.resolve();
                                                }}
                                                accept={{ 
                                                    'image/*': ['.png', '.jpg', '.jpeg'],
                                                    // 'application/pdf': ['.pdf', '.docx'],
                                                    'video/*': ['.mp4']
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </div>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter Notes Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter Description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Degree" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Categorys && Object.values(Categorys).map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                            ))}

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Status && Object.values(Status).map((statu) => (
                                            <SelectItem key={statu} value={statu}>
                                                {statu}
                                            </SelectItem>
                                            ))}

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            

                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Stock</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter Number of Stocks"
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                required={false}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}    
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter Price"
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                required={false}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}    
                            />

                            <div className="md:col-span-2 flex justify-end">
                                <Button
                                    type="submit" 
                                    className="w-full md:w-1/2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardHeader>
        </Card>
    )
}