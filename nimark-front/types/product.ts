export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: {
      id: string;
      name: string;
    };
    images: {
      id: string;
      url: string;
    }[];
  }