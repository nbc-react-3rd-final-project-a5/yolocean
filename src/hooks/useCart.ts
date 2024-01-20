import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/service/supabase";
import { CartBox } from "@/types/db";
import { useEffect } from "react";

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
      await supabase.from("cart").update({ count: count }).eq("id", cartId).select();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart", cartId]
      });
      refetch();
    }
  });

  const deleteCart = async (cartId: string) => {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);
    if (error) console.log(error);
  };

  return { cart, isLoading, updateCountMutation, deleteCart };
};

export default useCart;
