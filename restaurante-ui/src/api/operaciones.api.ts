import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Pedidos = {
  id: number;
  name: string;
  capacity: number;

};

export async function listPedidosPublicApi() {
  const { data } = await http.get<Paginated<Pedidos>>("/api/Pedidos/");
  return data; // { ... , results: [] }
}

export async function listPedidosAdminApi() {
  const { data } = await http.get<Paginated<Pedidos>>("/api/Pedidos/");
  return data;
}

export async function createPedidosApi(payload: Omit<Pedidos, "id">) {
  const { data } = await http.post<Pedidos>("/api/Pedidos/", payload);
  return data;
}

export async function updatePedidosApi(id: number, payload: Partial<Pedidos>) {
  const { data } = await http.put<Pedidos>(`/api/Pedidos/${id}/`, payload);
  return data;
}

export async function deletePedidosApi(id: number) {
  await http.delete(`/api/Pedidos/${id}/`);
}