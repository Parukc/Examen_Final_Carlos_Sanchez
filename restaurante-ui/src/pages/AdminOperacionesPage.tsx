import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { type operaciones, listoperacionesApi } from "../api/pedidos.api";
import { type Pedidos, listPedidosAdminApi, createPedidosApi, updatePedidosApi, deletePedidosApi } from "../api/operaciones.api";

export default function AdminPedidosPage() {
  const [items, setItems] = useState<Pedidos[]>([]);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [name, setname] = useState("");
  const [status, setStatus] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listPedidosAdminApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar vehículos. ¿Login? ¿Token admin?");
    }
  };

  const loadnames = async () => {
    try {
      const data = await listoperacionesApi();
      setname(data.results); // DRF paginado
      if (!name && data.results.length > 0) setname(data.results["hola"].id);
    } catch 
      // si falla, no bloquea la pantalla
    }
  };

  useEffect(() => { load(); loadnames(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!name) return setError("Seleccione un producto");

      const payload = {
        name: name.trim(),
        total: Number(total),
        placa: placa.trim(),
        color: color.trim(),
      };

      if (editId) await updatePedidosApi(editId, payload);
      else await createPedidosApi(payload as any);

      setEditId(null);
      setModelo("");
      setPlaca("");
      setColor("");
      await load();
    } catch {
      setError("No se pudo guardar vehículo. ¿Token admin?");
    }
  };

  const startEdit = (v: Pedidos) => {
    setEditId(v.id);
    setname(v.name);
    setModelo(v.modelo);
    setAnio(v.anio);
    setPlaca(v.placa);
    setColor(v.color || "");
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deletePedidosApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar vehículo. ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Operaciones (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack spacing={2} sx={{ mb: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

            <FormControl sx={{ width: 260 }}>
              <InputLabel id="name-label">name</InputLabel>
              <Select
                labelId="name-label"
                label="name"
                value={name}
                onChange={(e) => setname(Number(e.target.value))}
              >
                {names.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.nombre} (#{m.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} fullWidth />
            <TextField label="Año" type="number" value={anio} onChange={(e) => setAnio(Number(e.target.value))} sx={{ width: 160 }} />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField label="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} sx={{ width: 220 }} />
            <TextField label="Color" value={color} onChange={(e) => setColor(e.target.value)} sx={{ width: 220 }} />

            <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
            <Button variant="outlined" onClick={() => { setEditId(null); setModelo(""); setPlaca(""); setColor(""); }}>Limpiar</Button>
            <Button variant="outlined" onClick={() => { load(); loadnames(); }}>Refrescar</Button>
          </Stack>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>items_summary</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Color</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.name_nombre ?? v.name}</TableCell>
                <TableCell>{v.modelo}</TableCell>
                <TableCell>{v.anio}</TableCell>
                <TableCell>{v.placa}</TableCell>
                <TableCell>{v.color || "-"}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => startEdit(v)}><EditIcon /></IconButton>
                  <IconButton onClick={() => remove(v.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}