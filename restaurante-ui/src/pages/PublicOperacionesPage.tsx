import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Stack, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { type Pedidos, listPedidosPublicApi } from "../api/operaciones.api";

export default function PublicVehiclesPage() {
  const [items, setItems] = useState<Pedidos[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listPedidosPublicApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar la lista pública. ¿Backend encendido?");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">Lista de Platos (Público)</Typography>
          <Button variant="outlined" onClick={load}>Refrescar</Button>
        </Stack>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>name</TableCell>
              <TableCell>total</TableCell>
              <TableCell>status</TableCell>
              <TableCell>is_available</TableCell>
              <TableCell>created_at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id}>
              <TableCell>{v.id}</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>name</TableCell>
              <TableCell>total</TableCell>
              <TableCell>status</TableCell>
              <TableCell>is_available</TableCell>
              <TableCell>created_at</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}