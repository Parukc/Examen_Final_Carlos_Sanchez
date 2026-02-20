import { http } from "./http";
import type { Paginated } from "../types/drf";
import type { Vehiculo } from "../types/pedidos";

export async function listVehiculosApi(): Promise<Paginated<Vehiculo> | Vehiculo[]> {
  const { data } = await http.get<Paginated<Vehiculo> | Vehiculo[]>("/api/vehiculos/");
  return data;
}