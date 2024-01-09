import { ProductProperties } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

const useProduct = (url?: string) => {
  const {
    data: product,
    isLoading,
    isError
  } = useQuery<ProductProperties[] | ProductProperties>({
    queryFn: async (): Promise<ProductProperties[] | ProductProperties> => {
      const response = await fetch(`/api/product${url ? `/${url}` : ""}`, { method: "GET" });
      const data = await response.json();
      return data;
    },

    queryKey: url ? ["product", url] : ["product"]
  });

  return { product, isLoading };
};

export default useProduct;
