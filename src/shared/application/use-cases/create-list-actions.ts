import { apiClient } from "@/lib/api";

export function createListActions<T>(basePath: string) {
  async function findAll(): Promise<T[]> {
    return apiClient<T[]>(basePath, { method: "GET" });
  }

  async function findById(id: string): Promise<T> {
    return apiClient<T>(`${basePath}/${id}`, { method: "GET" });
  }

  async function create(data: Partial<T>): Promise<T> {
    return apiClient<T>(basePath, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function update(id: string, data: Partial<T>): Promise<T> {
    return apiClient<T>(`${basePath}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async function remove(id: string): Promise<void> {
    await apiClient<void>(`${basePath}/${id}`, { method: "DELETE" });
  }

  return { findAll, findById, create, update, remove };
}
