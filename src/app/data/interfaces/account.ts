//account.ts
export interface Account {
  _id: string;
  userInfo?: {
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    location?: string;
  };
  email?: string;
  password?: string;
  photo?: string;
  cart: {
    [productId: string]: number; // ключи - id продуктов, значения - количество
  };
  favorites: string[]; // массив id избранных продуктов
  history: {
    [orderId: string]: {
      date: string;
      userinfo: {
        name?: string;
        surname?: string;
        phone?: string;
        email?: string;
        location?: string;
      };
      products: {
        [productId: string]: {
          count: number;
          price: number;
          totalPrice: number;
        };
      };
      totalPrice: number;
    };
  };
}