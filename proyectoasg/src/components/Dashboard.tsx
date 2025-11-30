
import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// tipo de item
interface ItemType {
    id?: number;
    nombre: string;
    tipo: string;
    marca: string;
    precio: number;
}

export default function Dashboard() {
    const [item, setItem] = useState<ItemType>({ nombre: '', tipo: '', marca: '', precio: 0 });
    const [datos, setDatos] = useState<ItemType[]>([]);

    // cargar datos al iniciar
    useEffect(() => { listar() }, []);

    //obetner datos de bd
    async function listar() {
        try {
            const resp = await fetch('http://localhost:3030/getItems');
            const json = await resp.json();
            setDatos(json.data || []);
        } catch (err) {
            console.error("Error al listar items:", err);
        }
    }

    // insertar un registro
    async function insertar(e: React.FormEvent) {
        e.preventDefault();
        try {
            const qs = new URLSearchParams(item as any).toString();
            const resp = await fetch(`http://localhost:3030/addItem?${qs}`);
            const json = await resp.json();
            if (json.filasAfectadas > 0) {
                alert('Datos guardados con éxito');
                listar(); // refrescar tabla
                setItem({ nombre: '', tipo: '', marca: '', precio: 0 }); // limpiar formulario
            } else {
                alert('No se insertaron datos');
            }
        } catch (err) {
            console.error("Error al insertar item:", err);
        }
    }

    // borrar un registro
    async function borrar(id?: number) {
        if (!id) return;
        try {
            const resp = await fetch(`http://localhost:3030/deleteItem?id=${id}`);
            const json = await resp.json();
            if (json.filasAfectadas > 0) {
                alert('Item eliminado correctamente');
                listar();
            } else {
                alert('No se pudo eliminar el item');
            }
        } catch (err) {
            console.error("Error al borrar item:", err);
        }
    }

    return (
        <Box sx={{ p: 2 }}>
            <Paper sx={{ p: 2, mb: 4 }}>
                <Box component="form" onSubmit={insertar}>
                    <TextField
                        label="Nombre"
                        value={item.nombre}
                        onChange={e => setItem({ ...item, nombre: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Tipo"
                        value={item.tipo}
                        onChange={e => setItem({ ...item, tipo: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Marca"
                        value={item.marca}
                        onChange={e => setItem({ ...item, marca: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Precio"
                        type="number"
                        value={item.precio}
                        onChange={e => setItem({ ...item, precio: Number(e.target.value) })}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>Insertar</Button>
                </Box>
            </Paper>

            <Table aria-label="Tabla de items">
                <TableHead>
                    <TableRow>
                        <TableCell>Acciones</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Precio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datos.map(fila => (
                        <TableRow key={fila.id}>
                            <TableCell>
                                <Button onClick={() => borrar(fila.id)}>
                                    <DeleteForeverIcon />
                                </Button>
                            </TableCell>
                            <TableCell>{fila.nombre}</TableCell>
                            <TableCell>{fila.tipo}</TableCell>
                            <TableCell>{fila.marca}</TableCell>
                            <TableCell>{fila.precio}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
