export interface Item {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface BasketItem {
  id: number;
  item: Item;
  quantity: number;
}

export interface AppContextModel {
  basketItems?: BasketItem[];
  setBasketItems?: Function;
}

export interface User {
  id: number;
  tel: string;
  email: string;
  login: string;
  password: string;
}

export interface Order {
  id: number;
  date: string;
  user: User;
  status: boolean;
  orderedItems: OrderedItem[];
}

export interface OrderedItem {
  id: number;
  order: Order;
  item: Item;
  quantity: number;
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };

    authorized?: boolean;
  }
}
