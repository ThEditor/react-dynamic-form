import { axiosClient } from "@/lib/axios-client";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function useGetAllFormTypes({
  options,
}: {
  options?: Partial<UseQueryOptions<string[]>>;
}) {
  return useQuery({
    ...options,
    queryKey: ["get-all-form-types"],
    queryFn: async () => {
      const response = await axiosClient.get<string[]>(
        `/forms`,
      );
      return response.data;
    }
  });
}
