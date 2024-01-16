import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/service/supabase";

interface Props {
  userId: string;
  cartId: string;
}

interface CartBox {
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

const useCart = ({ userId, cartId }: Props) => {
  const queryClient = useQueryClient();
  const {
    data: cart,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async (): Promise<CartBox[]> => {
      const response = await fetch(`/api/cart/${userId}`, { method: "GET" });
      const data = await response.json();
      return data;
    }
  });

  const updateCountMutation = useMutation({
    mutationFn: async (count: number) => {
      await supabase.from("cart").update({ count: count }).eq("id", cartId).select();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart", cartId]
      });
    }
  });

  const deleteCart = async (cartId: string) => {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);
    if (error) console.log(error);
  };

  return { cart, isLoading, updateCountMutation, deleteCart };
};

export default useCart;
