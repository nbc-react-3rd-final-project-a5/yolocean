import { Store, StoreWithStock } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

const useOffice = (url?: string) => {
  const {
    data: office,
    isLoading,
    isError
  } = useQuery<StoreWithStock[]>({
    queryFn: async (): Promise<StoreWithStock[]> => {
      console.log(url);
      const response = await fetch(`/api/store${url ? `/${url}` : ""}`, { method: "GET" });
      const data = await response.json();
      return data;
    },

    queryKey: url ? ["store", url] : ["store"]
  });

  return { office, isLoading };
};

export default useOffice;
