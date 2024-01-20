import { CategoryTable } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

const useCategory = (url?: string) => {
  const {
    data: category,
    isLoading,
    isError
  } = useQuery<CategoryTable[]>({
    queryFn: async (): Promise<CategoryTable[]> => {
      const response = await fetch(`/api/category${url ? `/${url}` : ""}`, { method: "GET" });
      const data = await response.json();
      return data;
    },

    queryKey: url ? ["category", url] : ["category"]
  });

  return { category, isLoading };
};

export default useCategory;
