import { Tables } from "./supabase";

export type Cart = Tables<"cart">;
export type CategoryTable = Tables<"category">;
export type Product = Tables<"product">;
export type Qna = Tables<"qna">;
export type Rent = Tables<"rent">;
export type Review = Tables<"review">;
export type Stock = Tables<"stock">;
export type Store = Tables<"store">;
export type UserInfo = Tables<"userinfo">;
export type Region = Tables<"region">;
export interface ProductProperties extends Product {
  info: [string];
  category: {
    category_name: string;
  };
  stock: {
    count: number;
    store: {
      name: string;
      address: string;
    }[];
  };
}
export interface StoreWithStock extends Store {
  stock: [{ count: number }];
}
export interface ExtendReview extends Review {
  store: { name: string };
  userinfo: { username: string };
  product: { name: string; thumbnail: string };
  url: string[] | null;
}
