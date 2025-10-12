import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductForm from '../../components/Forms/ProductForm';


function ProductoEditar() {
  const breadcrumbItems = [
    { label: 'Inventario', href: '#' },
    { label: 'Edición de producto' },
  ];

  const initialProduct = {
    id: '001',
    nombre: 'Martillo de uña',
    descripcion:
      'Martillo de acero forjado con mango de fibra de vidrio ergonómico.',
    precio: '15.99',
    marca: 'Truper',
    proveedor: 'Ferretería Central',
    stock: '150',
    minStock: '5',
    fechaDeVencimiento: '',
    categoria: 'Herramientas Manuales',
    unidad: 'Unidad',
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <ProductForm
        mode='edit'
        initialData={initialProduct}
        onSubmit={(data) => console.log('Producto editado:', data)}
        link={'/productos'}
      />
    </div>
  );
}

export default ProductoEditar;
