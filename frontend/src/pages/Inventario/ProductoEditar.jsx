import React from 'react';
import { useLoaderData } from 'react-router';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductForm from '../../components/Forms/ProductForm';


function ProductoEditar() {

  const { producto } = useLoaderData();

  const breadcrumbItems = [
    { label: 'Inventario', href: '#' },
    { label: 'Edición de producto' },
  ];
console.log(producto);
  const initialData = {
    codigo: producto.codigo,
    nombre: producto.nombre,
    descripcion: producto.descripcion || '',
    precio: producto.precio.toString(),
    stock: producto.stock.toString(),
    stockMin: producto.stockMin.toString(),
    fechaVencimiento: producto.fechaVencimiento
      ? new Date(producto.fechaVencimiento).toISOString().split('T')[0]
      : '',
    idCategoria: producto.categoria?.idCategoria?.toString() || '',
    idMarca: producto.marca?.idMarca?.toString() || '',
    idUnidad: producto.productosunidad?.[0]?.idUnidad?.toString() || '',
    idProveedor: producto.productoproveedor?.[0]?.idProveedor?.toString() || '',
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <ProductForm
        mode='edit'
        initialData={initialData}
      />
    </div>
  );
}

export default ProductoEditar;
