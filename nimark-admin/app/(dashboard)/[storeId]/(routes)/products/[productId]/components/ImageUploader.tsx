import React, { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploaderProps {
  images: { id: string; url: string }[];
  setImages: React.Dispatch<React.SetStateAction<{ id: string; url: string }[]>>;
  form: any; // Replace 'any' with the actual type of your form
}

interface SortableImageProps {
  image: { id: string; url: string };
  index: number;
  removeImage: (id: string) => void;
}

const SortableImage: React.FC<SortableImageProps> = ({ image, index, removeImage }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative w-[200px] h-[200px]">
      <Image
        src={image.url}
        alt="Product image"
        fill
        className="object-cover rounded-lg"
      />
      <Button
        type="button"
        onClick={() => removeImage(image.id)}
        className="absolute top-2 right-2 bg-red-500 p-2 rounded-full"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, form }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onUpload = (result: any) => {
    const newImage = { id: result.info.public_id, url: result.info.secure_url };
    setImages((prev) => [...prev, newImage]);
    form.setValue('images', [...images, newImage]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    form.setValue('images', images.filter((img) => img.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newOrder = [...items];
        const [reorderedItem] = newOrder.splice(oldIndex, 1);
        newOrder.splice(newIndex, 0, reorderedItem);

        form.setValue('images', newOrder);
        return newOrder;
      });
    }
  };

  return (
    <div className="mb-4">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={images.map(img => img.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((image, index) => (
              <SortableImage key={image.id} image={image} index={index} removeImage={removeImage} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={onUpload}
        options={{
          maxFiles: 10,
        }}
      >
        {({ open }) => {
          const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            open();
          };
          return (
            <Button
              type="button"
              disabled={false}
              variant="secondary"
              onClick={handleOnClick}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;