import { Cart } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

// interface CartBox {
//   cart: Cart;
//   // count: number | null;
//   // id: string;
//   // product_id: string | null;
//   // store_id: string | null;
//   // user_id: string;
//   store: {
//     name: string;
//   };
//   product: {
//     name: string;
//     thumbnail: string;
//   };
// }
interface CartBox {
  cart: {
    count: number | null;
    id: string;
    product_id: string | null;
    store_id: string | null;
    user_id: string;
    product: {
      name: string;
      thumbnail: string;
    };
  };
  store: {
    name: string;
  };
  product: {
    name: string;
    thumbnail: string;
    price: number;
    percentage_off: number;
    category: {
      category_name: string;
    };
  };
}

const useCart = (id: string) => {
  const {
    data: cart,
    isLoading,
    isError
  } = useQuery<CartBox[]>({
    queryFn: async (): Promise<CartBox[]> => {
      const response = await fetch(`/api/cart/${id}`, { method: "GET" });
      const data = await response.json();
      return data;
    },
    queryKey: ["cart"]
  });
  // console.log(cart);
  return { cart, isLoading };
};

export default useCart;
