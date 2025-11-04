// utils/constants.js

export const ESTADOS = ['activo', 'inactivo'];

export const ROLES = [ '1' /*'encargado'*/, '2' /*'vendedor'*/, '3'/* 'admin'*/];

export const UNIDADES_MEDIDA = ['kg', 'litro', 'unidad', 'metro'];

export const CATEGORIAS = ['Herramientas', 'Pinturas', 'Fijaciones'];

export const CAMPOS = [
  {
    label: 'ID Producto',
    value: 'idProducto',
  },
  {
    label: 'Código',
    value: 'codigo',
  },
  {
    label: 'Nombre',
    value: 'nombre',
  },
  {
    label: 'Descripción',
    value: 'descripcion',
  },
  {
    label: 'Precio',
    value: (row) => parseFloat(row.precio).toFixed(2),
  },
  {
    label: 'Stock',
    value: 'stock',
  },
  {
    label: 'Fecha Vencimiento',
    value: (row) => {
      if (!row.fechaVencimiento) return '';
      const fecha = new Date(row.fechaVencimiento);
      return fecha.toLocaleDateString('es-AR'); // Formato: dd/mm/yyyy
    },
  },
  {
    label: 'Estado',
    value: (row) => (row.estado === 'activo' ? 'Activo' : 'Inactivo'),
  },
  {
    label: 'Categoría',
    value: (row) => row.categoria?.nombre || '',
  },
  {
    label: 'Marca',
    value: (row) => row.marca?.nombre || '',
  },
  {
    label: 'Unidad',
    value: (row) => {
      // Toma la primera unidad si hay múltiples
      if (row.productosunidad && row.productosunidad.length > 0) {
        return row.productosunidad[0].unidad?.nombre || '';
      }
      return '';
    },
  },
  {
    label: 'Proveedor',
    value: (row) => {
      // Toma el primer proveedor si hay múltiples
      if (row.productoproveedor && row.productoproveedor.length > 0) {
        return row.productoproveedor[0].proveedor?.nombre || '';
      }
      return '';
    },
  },
];