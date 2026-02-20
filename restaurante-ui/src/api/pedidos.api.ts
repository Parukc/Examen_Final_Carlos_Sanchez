import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type operaciones = { id: number; name: string };

export async function listoperacionesApi() {
  const { data } = await http.get<Paginated<operaciones>>("/api/operaciones/");
  return data; // { count, next, previous, results }
}

export async function createoperacionesApi(name: string) {
  const { data } = await http.post<operaciones>("/api/operaciones/", { name });
  return data;
}

export async function updateoperacionesApi(id: number, name: string) {
  const { data } = await http.put<operaciones>(`/api/operaciones/${id}/`, { name });
  return data;
}

export async function deleteoperacionesApi(id: number) {
  await http.delete(`/api/operaciones/${id}/`);
}