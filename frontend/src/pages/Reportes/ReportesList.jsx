import React from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs';

function ReportesList() {
  const breadcrumbItems = [
    { label: 'Reportes', href: '#' },
    { label: 'Listado de ventas' },
  ];
  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      ReportesList
    </div>
  );
}

export default ReportesList