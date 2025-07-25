'use client'

import * as z from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { Banner } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import ImageUpload from '@/components/ui/image-upload'
import { AlertModal } from '@/components/ui/alert-modal'

const formSchema = z.object({
   label: z.string().min(1),
   image: z.any(),
})

type BannerFormValues = z.infer<typeof formSchema>

interface BannerFormProps {
   initialData: Banner | null
}

export const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
   const params = useParams()
   const router = useRouter()

   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const title = initialData ? 'Edit banner' : 'Create banner'
   const description = initialData ? 'Edit a banner.' : 'Add a new banner'
   const toastMessage = initialData ? 'Banner updated.' : 'Banner created.'
   const action = initialData ? 'Save changes' : 'Create'

   const form = useForm<BannerFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
         label: '',
         image: '',
      },
   })

   const onSubmit = async (data: BannerFormValues) => {
      console.log("Form submitted with data:", data) // ✅ check the data being submitted
      try {
         setLoading(true)

         let bannerImageUrl = initialData?.image || '';

         if (data.image && data.image instanceof File) {
            const formData = new FormData();
            formData.append("file", data.image);

            const response = await fetch('/api/upload', {
               method: "POST",
               body: formData,
            });

            const uploadRes = await response.json();

            if (!response.ok) {
               throw new Error(uploadRes.error || "Failed to upload Image");
            }

            data.image = uploadRes.url;
         }

         const payload = {
            label: data.label,
            image: bannerImageUrl,
         };

         const endPoint = initialData
            ? `/api/banners/${params.bannerId}`
            : `/api/banners`;

         await fetch(endPoint, {
            method: initialData ? "PATCH": 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
         });

         router.refresh()
         router.push(`/banners`)
         toast.success(toastMessage)
      } catch (error: any) {
         toast.error('Something went wrong.')
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)

         await fetch(`/api/banners/${params.bannerId}`, {
            method: 'DELETE',
            cache: 'no-store',
         })

         router.refresh()
         router.push(`/banners`)
         toast.success('Banner deleted.')
      } catch (error: any) {
         toast.error(
            'Make sure you removed all categories using this banner first.'
         )
      } finally {
         setLoading(false)
         setOpen(false)
      }
   }

   return (
      <>
         <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
         />
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {initialData && (
               <Button
                  disabled={loading}
                  variant="destructive"
                  size="sm"
                  onClick={() => setOpen(true)}
               >
                  <Trash className="h-4" />
               </Button>
            )}
         </div>
         <Separator />
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8 w-full"
            >
               <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Background image</FormLabel>
                        <FormControl>
                           <ImageUpload
                              value={
                                 typeof field.value === 'string' ? field.value : ''
                              }
                              disabled={loading}
                              onChange={(file) => field.onChange(file)} 
                              onRemove={() => field.onChange('')}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                     control={form.control}
                     name="label"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Label</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="Banner label"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <Button disabled={loading} className="ml-auto" type="submit">
                  {action}
               </Button>
            </form>
         </Form>
      </>
   )
}
