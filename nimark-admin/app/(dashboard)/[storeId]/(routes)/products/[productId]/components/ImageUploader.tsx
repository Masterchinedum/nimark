//nimark-admin/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ImageUploader.tsx

"use client"

import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import { UseFormReturn } from 'react-hook-form';
import { Button } from "@/components/ui/button";

interface UploadedImage {
  url: string;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
  form: UseFormReturn<any>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, form }) => {
  const onUpload = (result: any) => {
    const newImage = { url: result.info.secure_url };
    setImages((prev) => [...prev, newImage]);
    form.setValue('images', [...images, newImage]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    form.setValue('images', newImages);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Product Images</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <CldImage
              width="200"
              height="200"
              src={image.url}
              alt={`Product image ${index + 1}`}
            />
            <Button
              className="absolute top-0 right-0 bg-red-500 text-white p-1"
              onClick={() => removeImage(index)}
              size="sm"
              variant="destructive"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset="xgwvqsdi"
        onSuccess={onUpload}
      >
        {({ open }) => (
          <Button onClick={() => open()} type="button">
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;