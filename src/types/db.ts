import { Tables, TablesInsert } from "./supabase";

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
export type RentLogInsert = TablesInsert<"rentlog">;
export type FixedReview = Tables<"fixed_review">;
export type Banner = Tables<"banner">;
export type Carousel = Tables<"carousel">;

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
  store: { name: string; region: { region: string } };
  userinfo: { username: string; avatar_url: string };
  product: { name: string; thumbnail: string; category_id: string };
  url: string[] | null;
  answer: string | null;
}

export interface ExtendReviewNotNull extends Review {
  store: { name: string; region: { region: string } };
  userinfo: { username: string; avatar_url: string };
  product: { name: string; thumbnail: string; category_id: string };
  url: string[];
}
export interface ExtendFixedReview extends FixedReview {
  review: ExtendReviewNotNull;
}

export interface CartBox {
  count: number | null;
  id: string;
  product_id: string | null;
  store_id: string | null;
  user_id: string;
  rent_date: string;
  product: {
    name: string;
    thumbnail: string;
    price: number;
    percentage_off: number;
    category: {
      category_name: string;
    };
  };
  store: {
    name: string;
  };
}

export interface ExtendQna extends Qna {
  product: Product;
  userinfo: { username: string; avatar_url: string };
  url: string[] | null;
}

export interface AdminReview {
  id: string;
  title: string;
  content: string;
  url: string[];
  created_at: string;
  product_id: string;
  product: {
    name: string;
    thumbnail: string;
    category_id: string;
    category: {
      category_name: string;
    };
  };
  store_id: string;
  store: { name: string };
  user_id: string;
  userinfo: {
    username: string;
  };
  fixed_review: {
    id: string;
  };
  blind: boolean;
}

export interface AdminRent {
  id: string;
  product_id: string;
  store_id: string;
  user_id: string;
  product_name: string;
  thumbnail: string;
  category_name: string;
  store_name: string;
  count: number;
  paid_price: number;
  rent_date: string;
  created_at: string;
  return: boolean;
  store: {
    id: string;
  };
  userinfo: {
    id: string;
    email: string;
    phone: string;
    username: string;
  };
}
