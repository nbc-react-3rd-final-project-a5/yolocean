import { CategoryTable } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
  const {
    data: category,
    isLoading,
    isError
  } = useQuery<CategoryTable[]>({
    queryFn: async (): Promise<CategoryTable[]> => {
      const response = await fetch(`/api/category`, { method: "GET" });
      const data = await response.json();
      return data;
    },

    queryKey: ["category"]
  });

  return { category, isLoading };
};

const getCategoryNameById = (categoryId: string) => {
  const {
    data: categoryName,
    isLoading,
    isError
  } = useQuery<string>({
    queryFn: async (): Promise<string> => {
      const response = await fetch(`/api/category/${categoryId}`, { method: "GET" });
      const data = await response.json();
      return data;
    },
    queryKey: ["category", categoryId]
  });

  return { categoryName, isLoading };
};
export { useCategory, getCategoryNameById };
