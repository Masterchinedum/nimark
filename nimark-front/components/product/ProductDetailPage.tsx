"use client"

import React, { useState } from 'react';
   import Image from 'next/image';
   import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
   import { Button } from '@/components/ui/button';
   import { Card, CardContent } from '@/components/ui/card';
   import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

   interface ProductImage {
     id: string;
     url: string;
   }

   interface ProductDetails {
     id: string;
     name: string;
     description: string;
     price: number;
     stock: number;
     brand?: {
       name: string;
     };
     color: {
       name: string;
     };
     size: {
       value: string;
     };
     images: ProductImage[];
     properties?: Record<string, string | number | boolean>;
   }

   interface ProductDetailPageProps {
     product: ProductDetails;
   }

   const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
     const [currentImageIndex, setCurrentImageIndex] = useState(0);

     const nextImage = () => {
       setCurrentImageIndex((prevIndex) => 
         prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
       );
     };

     const prevImage = () => {
       setCurrentImageIndex((prevIndex) => 
         prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
       );
     };

     return (
       <div className="container mx-auto px-4 py-8">
         <div className="flex flex-col lg:flex-row gap-8">
           {/* Image Gallery */}
           <div className="lg:w-2/3">
             <div className="relative aspect-square overflow-hidden rounded-lg">
               <Image
                 src={product.images[currentImageIndex].url}
                 alt={product.name}
                 fill
                 className="object-cover"
               />
               <button 
                 onClick={prevImage} 
                 className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
               >
                 <ChevronLeft className="h-6 w-6" />
               </button>
               <button 
                 onClick={nextImage} 
                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
               >
                 <ChevronRight className="h-6 w-6" />
               </button>
             </div>
             <div className="flex mt-4 gap-2 overflow-x-auto">
               {product.images.map((image, index) => (
                 <Image
                   key={image.id}
                   src={image.url}
                   alt={`${product.name} - Image ${index + 1}`}
                   width={80}
                   height={80}
                   className={`object-cover rounded cursor-pointer ${
                     index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                   }`}
                   onClick={() => setCurrentImageIndex(index)}
                 />
               ))}
             </div>
           </div>

           {/* Product Information */}
           <div className="lg:w-1/3">
             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
             <p className="text-2xl font-semibold mb-4">${product.price}</p>
             <p className="text-gray-600 mb-6">{product.description}</p>

             <div className="flex items-center gap-4 mb-6">
               <Button className="flex-1">
                 <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
               </Button>
               <Button variant="outline">
                 <Heart className="h-4 w-4" />
               </Button>
             </div>

             <Card>
               <CardContent className="p-4">
                 <h3 className="font-semibold mb-2">Product Details</h3>
                 <ul className="space-y-2">
                   <li><span className="font-medium">Brand:</span> {product.brand?.name}</li>
                   <li><span className="font-medium">Color:</span> {product.color.name}</li>
                   <li><span className="font-medium">Size:</span> {product.size.value}</li>
                   <li><span className="font-medium">In Stock:</span> {product.stock}</li>
                 </ul>
               </CardContent>
             </Card>
           </div>
         </div>

         {/* Additional Information Tabs */}
         <Tabs defaultValue="description" className="mt-12">
           <TabsList>
             <TabsTrigger value="description">Description</TabsTrigger>
             <TabsTrigger value="specifications">Specifications</TabsTrigger>
             <TabsTrigger value="reviews">Reviews</TabsTrigger>
           </TabsList>
           <TabsContent value="description" className="mt-4">
             <p>{product.description}</p>
           </TabsContent>
           <TabsContent value="specifications" className="mt-4">
             <ul className="list-disc pl-5">
               {Object.entries(product.properties || {}).map(([key, value]) => (
                 <li key={key}><span className="font-medium">{key}:</span> {value.toString()}</li>
               ))}
             </ul>
           </TabsContent>
           <TabsContent value="reviews" className="mt-4">
             <p>No reviews yet.</p>
           </TabsContent>
         </Tabs>
       </div>
     );
   };

   export default ProductDetailPage;