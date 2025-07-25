'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

interface ImageUploadProps {
   disabled?: boolean
   onChange: (file: File) => void
   onRemove: () => void
   value: string // image URL for preview
}

const ImageUpload: React.FC<ImageUploadProps> = ({
   disabled,
   onChange,
   onRemove,
   value,
}) => {
   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         if (acceptedFiles.length > 0) {
            onChange(acceptedFiles[0])
         }
      },
      [onChange]
   )

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
         'image/*': [],
      },
      disabled,
   })

   return (
      <div className="space-y-2">
         {value ? (
            <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
               <Image
                  fill
                  alt="Uploaded image"
                  className="object-cover"
                  src={value}
               />
               <div className="absolute top-2 right-2 z-10">
                  <Button
                     type="button"
                     onClick={onRemove}
                     variant="destructive"
                     size="sm"
                  >
                     <Trash className="h-4" />
                  </Button>
               </div>
            </div>
         ) : (
            <div
               {...getRootProps()}
               className={`border border-dashed p-6 rounded-md text-center cursor-pointer ${
                  isDragActive ? 'bg-gray-100' : ''
               }`}
            >
               <input {...getInputProps()} />
               <p className="text-sm text-gray-600">
                  Drag & drop an image here, or click to select a file
               </p>
            </div>
         )}
      </div>
   )
}

export default ImageUpload
