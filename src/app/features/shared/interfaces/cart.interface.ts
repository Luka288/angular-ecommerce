export interface userCart {
  userId: string;
  createdAt: string;
  total: {
    price: {
      current: number;
      beforeDiscount: number;
    };
    quantity: number;
    products: number;
  };
  products: [
    {
      quantity: number;
      pricePerQuantity: number;
      beforeDiscountPrice: number;
      productId: string;
    }
  ];
  _id: string;
}
