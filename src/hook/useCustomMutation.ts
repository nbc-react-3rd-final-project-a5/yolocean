import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  mutationFn: MutationFunction<unknown, any> | undefined;
  queryKey: string[];
}

export const useCustomMutation = ({ mutationFn, queryKey }: Props) => {
  const queryClient = useQueryClient();

  const customMutaion = useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  return customMutaion;
};
