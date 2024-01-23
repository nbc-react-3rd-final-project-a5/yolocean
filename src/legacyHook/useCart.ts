import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/service/supabase";
import { CartBox } from "@/types/db";

interface Props {
  userId: string;
  cartId: string;
}

const useCart = ({ userId, cartId }: Props) => {
  const queryClient = useQueryClient();
  const {
    data: cart,
    isLoading,
    isError,
    refetch
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
      await fetch(`/api/cart/${cartId}`, {
        method: "PATCH",
        body: JSON.stringify(count)
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart", cartId]
      });
      refetch();
    }
  });

  const deleteCartMutation = useMutation({
    mutationFn: async (cartId: string) => {
      await supabase.from("cart").delete().eq("id", cartId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart", cartId]
      });
      refetch();
    }
  });

  const deleteUserCartMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/cart/${userId}`, { method: "DELETE" });
      const data = await response.json();
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    }
  });

  return { cart, isLoading, updateCountMutation, deleteCartMutation, deleteUserCartMutation };
};

export default useCart;
