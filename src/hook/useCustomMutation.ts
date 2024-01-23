import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  mutationFn: MutationFunction<unknown, void> | undefined;
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
