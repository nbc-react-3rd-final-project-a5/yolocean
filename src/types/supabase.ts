export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      banner: {
        Row: {
          banner_id: string;
          id: string;
        };
        Insert: {
          banner_id: string;
          id: string;
        };
        Update: {
          banner_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "banner_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "objects";
            referencedColumns: ["id"];
          }
        ];
      };
      carousel: {
        Row: {
          id: string;
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "carousel_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "objects";
            referencedColumns: ["id"];
          }
        ];
      };
      cart: {
        Row: {
          count: number | null;
          id: string;
          product_id: string | null;
          rent_date: string | null;
          store_id: string | null;
          user_id: string;
        };
        Insert: {
          count?: number | null;
          id?: string;
          product_id?: string | null;
          rent_date?: string | null;
          store_id?: string | null;
          user_id: string;
        };
        Update: {
          count?: number | null;
          id?: string;
          product_id?: string | null;
          rent_date?: string | null;
          store_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "store";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "userinfo";
            referencedColumns: ["id"];
          }
        ];
      };
      category: {
        Row: {
          category_name: string;
          id: string;
        };
        Insert: {
          category_name: string;
          id?: string;
        };
        Update: {
          category_name?: string;
          id?: string;
        };
        Relationships: [];
      };
      fixed_review: {
        Row: {
          id: string;
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fixed_review_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "review";
            referencedColumns: ["id"];
          }
        ];
      };
      product: {
        Row: {
          category_id: string | null;
          id: string;
          info: Json | null;
          info_img: string;
          name: string;
          original_price: number;
          percentage_off: number | null;
          price: number;
          thumbnail: string;
          view: number | null;
        };
        Insert: {
          category_id?: string | null;
          id?: string;
          info?: Json | null;
          info_img: string;
          name: string;
          original_price: number;
          percentage_off?: number | null;
          price: number;
          thumbnail: string;
          view?: number | null;
        };
        Update: {
          category_id?: string | null;
          id?: string;
          info?: Json | null;
          info_img?: string;
          name?: string;
          original_price?: number;
          percentage_off?: number | null;
          price?: number;
          thumbnail?: string;
          view?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          }
        ];
      };
      qna: {
        Row: {
          answer: string | null;
          content: string;
          created_at: string;
          id: string;
          product_id: string;
          title: string;
          url: Json | null;
          user_id: string;
        };
        Insert: {
          answer?: string | null;
          content: string;
          created_at?: string;
          id?: string;
          product_id: string;
          title: string;
          url?: Json | null;
          user_id: string;
        };
        Update: {
          answer?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          product_id?: string;
          title?: string;
          url?: Json | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "qna_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "qna_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "userinfo";
            referencedColumns: ["id"];
          }
        ];
      };
      region: {
        Row: {
          id: string;
          region: string;
        };
        Insert: {
          id?: string;
          region: string;
        };
        Update: {
          id?: string;
          region?: string;
        };
        Relationships: [];
      };
      rent: {
        Row: {
          count: number;
          created_at: string;
          id: string;
          product_id: string;
          rent_date: string;
          return: boolean;
          store_id: string;
          user_id: string;
        };
        Insert: {
          count: number;
          created_at?: string;
          id?: string;
          product_id: string;
          rent_date: string;
          return?: boolean;
          store_id: string;
          user_id: string;
        };
        Update: {
          count?: number;
          created_at?: string;
          id?: string;
          product_id?: string;
          rent_date?: string;
          return?: boolean;
          store_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rent_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rent_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "store";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rent_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "userinfo";
            referencedColumns: ["id"];
          }
        ];
      };
      review: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          product_id: string;
          store_id: string | null;
          title: string;
          url: Json | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          product_id: string;
          store_id?: string | null;
          title: string;
          url?: Json | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          product_id?: string;
          store_id?: string | null;
          title?: string;
          url?: Json | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "review_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "review_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "store";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "review_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "userinfo";
            referencedColumns: ["id"];
          }
        ];
      };
      stock: {
        Row: {
          count: number;
          id: string;
          product_id: string;
          store_id: string;
        };
        Insert: {
          count: number;
          id?: string;
          product_id: string;
          store_id: string;
        };
        Update: {
          count?: number;
          id?: string;
          product_id?: string;
          store_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stock_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stock_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "store";
            referencedColumns: ["id"];
          }
        ];
      };
      store: {
        Row: {
          address: string;
          id: string;
          lat: string | null;
          lng: string | null;
          name: string;
          region_id: string | null;
        };
        Insert: {
          address: string;
          id?: string;
          lat?: string | null;
          lng?: string | null;
          name: string;
          region_id?: string | null;
        };
        Update: {
          address?: string;
          id?: string;
          lat?: string | null;
          lng?: string | null;
          name?: string;
          region_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "store_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "region";
            referencedColumns: ["id"];
          }
        ];
      };
      userinfo: {
        Row: {
          admin: boolean | null;
          avatar_url: string | null;
          email: string | null;
          id: string;
          phone: string;
          username: string | null;
          verified: boolean | null;
        };
        Insert: {
          admin?: boolean | null;
          avatar_url?: string | null;
          email?: string | null;
          id: string;
          phone?: string;
          username?: string | null;
          verified?: boolean | null;
        };
        Update: {
          admin?: boolean | null;
          avatar_url?: string | null;
          email?: string | null;
          id?: string;
          phone?: string;
          username?: string | null;
          verified?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "userinfo_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"])
  ? (Database["public"]["Tables"] & Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
