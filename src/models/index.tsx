export interface Item {
  id: number;
  title: string;
  price: number;
  // category
  // ...
}

export interface BasketItem {
  id: number;
  item?: Item;
  quantity?: number;
}

export interface AppContextModel {
  basketItems?: BasketItem[];
  setBasketItems?: Function;
}
