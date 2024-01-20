import { Region } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

const useRegion = () => {
  const {
    data: regions,
    isLoading,
    isError
  } = useQuery<Region[]>({
    queryFn: async (): Promise<Region[]> => {
      const response = await fetch("/api/region", { method: "GET" });
      const data = await response.json();
      return data;
    },

    queryKey: ["region"]
  });

  return { regions, isLoading };
};

export default useRegion;
