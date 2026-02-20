import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { type operaciones, listoperacionesApi, createoperacionesApi, updateoperacionesApi, deleteoperacionesApi } from "../api/pedidos.api";

export default function AdminoperacionesPage() {
  const [items, setItems] = useState<operaciones[]>([]);
  const [name, setname] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listoperacionesApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar operaciones. ¿Login? ¿Token admin?");
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!name.trim()) return setError("name requerido");

      if (editId) await updateoperacionesApi(editId, name.trim());
      else await createoperacionesApi(name.trim());

      setname("");
      setEditId(null);
      await load();
    } catch {
      setError("No se pudo guardar operaciones. ¿Token admin?");
    }
  };

  const startEdit = (m: operaciones) => {
    setEditId(m.id);
    setname(m.name);
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteoperacionesApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar operaciones. ¿Vehículos asociados? ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin operaciones (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="name operaciones" value={name} onChange={(e) => setname(e.target.value)} fullWidth />
          <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
          <Button variant="outlined" onClick={() => { setname(""); setEditId(null); }}>Limpiar</Button>
          <Button variant="outlined" onClick={load}>Refrescar</Button>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>name</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.id}</TableCell>
                <TableCell>{m.name}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => startEdit(m)}><EditIcon /></IconButton>
                  <IconButton onClick={() => remove(m.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}