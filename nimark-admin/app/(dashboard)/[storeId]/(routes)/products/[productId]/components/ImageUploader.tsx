import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import { UseFormReturn } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface UploadedImage {
  id: string;
  url: string;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
  form: UseFormReturn<any>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, form }) => {
  const onUpload = (result: any) => {
    const newImage = { id: result.info.public_id, url: result.info.secure_url };
    const newImages = [...images, newImage];
    setImages(newImages);
    form.setValue('images', newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    form.setValue('images', newImages);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
    form.setValue('images', items);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Product Images</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-3 gap-4"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative group"
                    >
                      <CldImage
                        width="200"
                        height="200"
                        src={image.url}
                        alt={`Product image ${index + 1}`}
                        className="rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-md">
                        <Button
                          onClick={() => removeImage(index)}
                          size="sm"
                          variant="destructive"
                          type="button"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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