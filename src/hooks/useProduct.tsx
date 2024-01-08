import { Product } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

const getProduct = async (): Promise<Product> => {
  const response = await fetch("/api/product", { method: "GET" });
  const data = await response.json();
  return data;
};

const useProduct = () => {
  const { data: Product, isLoading, isError } = useQuery({ queryFn: getProduct, queryKey: [] });

  return { Product, isLoading };
};

export default useProduct;
