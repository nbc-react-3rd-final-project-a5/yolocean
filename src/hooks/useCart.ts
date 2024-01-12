import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// const useCart = (id: string) => {
//   const {
//     data: cart,
//     isLoading,
//     isError
//   } = useQuery<CartBox[]>({
//     queryFn: async (): Promise<CartBox[]> => {
//       const response = await fetch(`/api/cart/${id}`, { method: "GET" });
//       const data = await response.json();
//       return data;
//     },
//     queryKey: ["cart"]
//   });
//   // console.log(cart);
//   return { cart, isLoading };
// };

// export default useCart;

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

  //   const updateCountMutation = useMutation({
  // mutationFn:async () => {
  //       const response = await fetch(`/api/cart/$`)
  //   })
  return { cart, isLoading };
};

export default useCart;
