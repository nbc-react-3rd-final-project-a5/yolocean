import { Cart } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

interface CartBox {
  id: string;
  count: number;
  store: object;
  product: object;
}

const useCart = () => {
  const {
    data: cart,
    isLoading,
    isError
  } = useQuery<CartBox[]>({
    queryFn: async (): Promise<CartBox[]> => {
      const response = await fetch(`/api/cart`, { method: "GET" });
      const data = await response.json();
      return data;
    },
    queryKey: ["cart"]
  });
  return { cart, isLoading };
};

export default useCart;
