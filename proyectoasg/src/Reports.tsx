import React, { useState } from 'react';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import { Box, Button, Paper } from '@mui/material';
import InformeColeccion from './components/InformeColeccion';

export default function Reports() {
  const [coleccionData, setColeccionData] = useState<any[]>([]); //para almacenar los datos
  const [mostrarInforme, setMostrarInforme] = useState(false);   // para mostrar el componemte

  //funcion al pulsar el boton
  const handleInformeColeccion = async () => {
    try {
      //obtener los datos de la tabla coleccion
      const response = await fetch('http://localhost:3030/getItems');
      const data = await response.json();
      console.log('datos obtenidos:', data);
      
      setColeccionData(data.data);  //guardamos los datos

      //cambiamos la variable a true
      setMostrarInforme(true);
    } catch (error) {
      console.error('Error al obtener la colección:', error);
    }
  };
  return (
    <>
      <Menu />
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2, mb: 4 }}>
          <Button type="submit" variant="contained" onClick={handleInformeColeccion}>INFORME COLECCION</Button>
        </Paper>
      {mostrarInforme && <InformeColeccion datos={coleccionData} />}
      </Box>
    </>
  );
}
