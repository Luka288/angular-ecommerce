export interface base_products {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: products[];
}

export interface products {
  price: {
    current: number;
    currency: string;
    beforeDiscount: number;
    discountPercentage: number;
  };
  category: {
    id: string;
    name: string;
    image: string;
  };
  _id: string;
  title: string;
  description: string;
  issueDate: string;
  thumbnail: string;
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  images: string[];
}
