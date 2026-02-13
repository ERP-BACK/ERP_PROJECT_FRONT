"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface ListActions<T> {
  findAll: () => Promise<T[]>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
  getOne: (id: string) => Promise<T>;
}

interface UseListModuleOptions<T> {
  queryKey: string;
  actions: ListActions<T>;
  id?: string;
}

export function useListModule<T>({ queryKey, actions, id }: UseListModuleOptions<T>) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => actions.findAll(),
  });

  const createMutation = useMutation({
    mutationFn: (newData: Partial<T>) => actions.create(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data: updateData }: { id: string; data: Partial<T> }) =>
      actions.update(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const { data: getOne, isLoading: getOneIsLoading } = useQuery({
    queryKey: [queryKey, id], // Incluir id en el queryKey para mejor caché
    queryFn: () => actions.getOne(id!),
    enabled: !!id, // Solo obtener elemento cuando hay id
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => actions.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return {
    data,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
    getOne,
    getOneIsLoading,
  };
}
