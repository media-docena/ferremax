// pages/Productos/ProductoCrear.jsx
import React from 'react';
import ProductForm from '../../components/Forms/ProductForm';
import Breadcrumbs from '../../components/common/Breadcrumbs';

function ProductoCrear() {
  const breadcrumbItems = [
    { label: 'Inventario', href: '#' },
    { label: 'Registro de producto' },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <ProductForm
        mode='create'
        onSubmit={(data) => console.log('Producto creado:', data)}
        link={'/productos'}
      />
    </div>
  );
}

export default ProductoCrear;
