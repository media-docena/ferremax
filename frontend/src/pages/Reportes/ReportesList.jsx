import React from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs';

function ReportesList() {
  const breadcrumbItems = [
    { label: 'Reportes', href: '#' },
    { label: 'Listado de ventas' },
  ];

  const ventas = [
    {
      id: '001',
      userName: 'Alberto',
      userSurname: 'Martinez',
      date: '2025-09-19T18:50:22.169185',
      time: '09:30',
      paymentMethod: 'Tarjeta de crédito',
      totalAmount: 50000.00,
    },
    {
      id: '002',
      userName: 'Sofía',
      userSurname: 'Pérez',
      date: '2025-09-19T18:50:22.169185',
      time: '10:00',
      paymentMethod: 'Efectivo',
      totalAmount: 20000.00,
    },
    {
      id: '003',
      userName: 'Javier',
      userSurname: 'López',
      date: '2025-09-19T18:50:22.169185',
      time: '10:10',
      paymentMethod: 'Efectivo',
      totalAmount: 10500.00,
    },
    {
      id: '004',
      userName: 'Sofía',
      userSurname: 'Pérez',
      date: '2025-09-19T18:50:22.169185',
      time: '10:45',
      paymentMethod: 'Transferencia',
      totalAmount: 12000.00,
    },
    {
      id: '005',
      userName: 'ALberto',
      userSurname: 'Martinez',
      date: '2025-09-19T18:50:22.169185',
      time: '11:15',
      paymentMethod: 'Tarjeta de débito',
      totalAmount: 45000.00,
    },
    {
      id: '006',
      userName: 'Alberto',
      userSurname: 'Martinez',
      date: '2025-09-19T18:50:22.169185',
      time: '11:30',
      paymentMethod: 'Tarjeta de crédito',
      totalAmount: 63520.80,
    },
    {
      id: '007',
      userName: 'Javier',
      userSurname: 'López',
      date: '2025-09-19T18:50:22.169185',
      time: '14:00',
      paymentMethod: 'Efectivo',
      totalAmount: 15350.00,
    },
    {
      id: '008',
      userName: 'Sofía',
      userSurname: 'Pérez',
      date: '2025-09-19T18:50:22.169185',
      time: '15:00',
      paymentMethod: 'Transferencia',
      totalAmount: 22360.75, 
    }                     
  ];

  // Logica para los widgets
  
  const historicoVentas = 150;

  const topProductos = [
    { productId: '001', 
      name: 'Martillo de uña', 
      quantitySold: 250 },
    { productId: '002', 
      name: 'Taladro inalámbrico', 
      quantitySold: 185 },
    { productId: '003', 
      name: 'Pintura látex blanca 4L', 
      quantitySold: 180 },
    { productId: '004', 
      name: 'Cemento gris 50kg', 
      quantitySold: 150 },
    { productId: '005', 
      name: 'Lijadora orbital', 
      quantitySold: 160 },
  ];
  
  const top3Productos = [...topProductos]
  .sort((a, b) => b.quantitySold - a.quantitySold)
  .slice(0, 3);
  
  const localCurrency = (value) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabla con listado de ventas */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 text-left mb-6">Listado de Ventas</h2>

          {/* Barra de filtros */}
        <div className="flex flex-col border-b border-gray-200 md:flex-row items-stretch gap-3 mb-3 pb-4">
            {/* Buscador de ventas */}
            <div className="flex-1 md:flex-none w-full md:w-1/3">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                  </svg>
                </span>
                <input
                  type="search"
                  placeholder="Buscar venta..."
                  className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
            </div>

            {/* Select Forma de Pago */}
            <div className="w-full md:w-1/4">
              <select className="w-full py-2 px-3 border border-gray-200 rounded-md text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300">
                <option value="" disabled selected>Forma de pago</option>
                <option>Tarjeta de crédito</option>
                <option>Tarjeta de débito</option>
                <option>Efectivo</option>
                <option>Transferencia</option>
              </select>
            </div>

            {/* Filtro por fecha */}
            <div className="flex items-center gap-2 w-full md:w-1/3">
              <div className="w-1/2">
                <input
                  type="date"
                  className="w-full py-2 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="date"
                  className="w-full py-2 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
            </div>
        </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="text-sm font-semibold text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-center">ID VENTA</th>
                  <th className="p-4 text-center">EMPLEADO</th>
                  <th className="p-4 text-center">FECHA</th>
                  <th className="p-4 text-center">HORA</th>
                  <th className="p-4 text-center">FORMA DE PAGO</th>
                  <th className="p-4 text-center">TOTAL DE LA VENTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {ventas.map((venta) => (
                  <tr key={venta.id} className="hover:bg-gray-50">
                    <td className="p-4 text-center">{venta.id}</td>
                    <td className="p-4 text-center">{venta.userName} {venta.userSurname}</td>
                    <td className="p-4 text-center">{new Date(venta.date).toLocaleDateString('es-AR')}</td>
                    <td className="p-4 text-center">{venta.time}</td>
                    <td className="p-4 text-center">{venta.paymentMethod}</td>
                    <td className="p-4 text-center">{localCurrency(venta.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Widgets */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          {/* Total histórico de ventas */}
          <div className="p-4 rounded-lg bg-white shadow-lg">
            <h3 className="text-m font-medium text-gray-600 text-center">Total de Ventas Histórico</h3>
            <p className="mt-2 text-2xl font-semibold text-yellow-400 text-center">{historicoVentas}</p>
            <p className="mt-1 text-xs text-center text-gray-500">Desde el inicio de operaciones</p>
          </div>

          {/* Top 3 productos */}
          <div className="p-4 rounded-lg bg-white shadow-lg">
            <h3 className="text-m font-medium text-gray-600 text-center">Top 3 Productos Más Vendidos</h3>
            <ol className="mt-3 space-y-2">
              {top3Productos.map((p) => (
                <li key={p.productId} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 font-semibold"> {p.name}</span>
                  <span className="text-sm">{p.quantitySold} unidades</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportesList