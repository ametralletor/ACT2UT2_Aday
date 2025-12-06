import React from 'react';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';

// props del componente
interface PropsColeccion {
  datos: { nombre: string; marca: string; tipo: string; precio: number }[];
}

export default function InformeColeccion({ datos }: PropsColeccion) {
  // columnas de coleccion
  const columns = [
    { title: 'Nombre', field: 'nombre', filtering: false },
    { title: 'Marca', field: 'marca', filtering: true },
    { title: 'Tipo', field: 'tipo', filtering: true },
    { title: 'Precio', field: 'precio', type: 'numeric' as const },
  ];

  // calcular total de precios
  const totalPrecio = datos.reduce((suma, item) => suma + item.precio, 0);

  //fila de totales al final de los datos
  const datosConTotal = [
    ...datos,
    { nombre: 'TOTAL', marca: '', tipo: '', precio: totalPrecio },
  ];

  return (
    <MaterialTable
      title="Informe de Colección"
      columns={columns}
      data={datosConTotal}
      options={{
        exportMenu: [
          {
            label: 'Exportar PDF',
            exportFunc: (cols: any[], data: any[]) =>
              ExportPdf(cols, data, 'InformeColeccion'),
          },
          {
            label: 'Exportar CSV',
            exportFunc: (cols: any[], data: any[]) =>
              ExportCsv(cols, data, 'InformeColeccion'),
          },
        ],
        filtering: true,         // filtrar columnas
        columnsButton: true,     // elegir que columnas mostrar
        paging: true,
        draggable: true,         // mover columnas
        headerStyle: {
          backgroundColor: '#1976d2',
          color: '#fff',
          fontWeight: 'bold',
        },
        rowStyle: (rowData) => ({
          backgroundColor: rowData.nombre === 'TOTAL' ? '#e0e0e0' : '#f5f5f5',
          fontWeight: rowData.nombre === 'TOTAL' ? 'bold' : 'normal',
        }),
      }}
    />
  );
}