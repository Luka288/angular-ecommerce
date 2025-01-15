export interface userCart {
  userId: string;
  createdAt: string;
  total: totalItemsInfo;
  products: singleCartItem[];
  _id: string;
}

export interface singleCartItem {
  quantity: number;
  pricePerQuantity: number;
  beforeDiscountPrice: number;
  productId: string;
}

export interface totalItemsInfo {
  price: {
    current: number;
    beforeDiscount: number;
  };
  quantity: number;
  products: number;
}

export interface checkOut {
  success: boolean;
  message: string;
}
