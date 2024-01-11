import { Database } from "./supabase";

export type Cart = Database["public"]["Tables"]["cart"]["Row"];
export type CategoryTable = Database["public"]["Tables"]["category"]["Row"];
export type Product = Database["public"]["Tables"]["product"]["Row"];
export type Qna = Database["public"]["Tables"]["qna"]["Row"];
export type Region = Database["public"]["Tables"]["qna"]["Row"];
export type Rent = Database["public"]["Tables"]["rent"]["Row"];
export type Review = Database["public"]["Tables"]["review"]["Row"];
export type Stock = Database["public"]["Tables"]["stock"]["Row"];
export type Store = Database["public"]["Tables"]["store"]["Row"];
export type UserInfo = Database["public"]["Tables"]["userinfo"]["Row"];
export type Region = Database["public"]["Tables"]["region"]["Row"];
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
