// import { supabase } from "@/service/supabase";
// import { useQuery } from "@tanstack/react-query";
// import { CartBox } from "@/types/db";

// const handlePaymentSuccess = async (userId: string) => {
//   const {
//     data: cart,
//     isLoading,
//     isError
//   } = useQuery({
//     queryKey: ["cart"],
//     queryFn: async (): Promise<CartBox[]> => {
//       const response = await fetch(`/api/cart/${userId}`, { method: "GET" });
//       const data = await response.json();
//       return data;
//     }
//   });
//   console.log(cart);
// };

// export default handlePaymentSuccess;
