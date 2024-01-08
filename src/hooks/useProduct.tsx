import { ProductWithCategory } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

const getProduct = async (): Promise<ProductWithCategory[]> => {
  const response = await fetch("/api/product", { method: "GET" });
  const data = await response.json();
  return data;
};

const useProduct = () => {
  const { data: product, isLoading, isError } = useQuery({ queryFn: getProduct, queryKey: [] });

  return { product, isLoading };
};

export default useProduct;
