import { axiosClient } from "@/lib/axios-client";
import { FormType } from "@/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function useGetFormType({
  type,
  options,
}: {
  type: string;
  options?: Partial<UseQueryOptions<FormType>>;
}) {
  return useQuery({
    ...options,
    queryKey: ["get-form-type", type],
    queryFn: async ({ queryKey }) => {
      const response = await axiosClient.get<FormType>(
        `/form-types/${queryKey[1]}`,
      );
      return response.data;
    }
  });
}
