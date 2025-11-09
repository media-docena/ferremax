import React from 'react';
import { useLoaderData, useSearchParams } from 'react-router';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SearchBar from '../../components/common/SearchBar';
import {
  formatFechaArgentina,
  formatPrecio,
  formatHoraArgentina,
} from '../../helpers/productsHelper';

function ReportesList() {
  const { ventas, totalVentas, topProductos } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const breadcrumbItems = [
    { label: 'Reportes', href: '#' },
    { label: 'Listado de ventas' },
  ];

  // Top 3 productos más vendidos
  const top3Productos = topProductos
    .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
    .slice(0, 3);

  // Handler para filtros
  const handleFilterChange = (filterName, value) => {
    setSearchParams((prevParams) => {
      // Crea una nueva instancia de URLSearchParams desde la anterior
      const newParams = new URLSearchParams(prevParams);

      if (value && value.trim() !== '') {
        newParams.set(filterName, value);
      } else {
        // Si no hay valor, lo eliminamos
        newParams.delete(filterName);
      }
      
      return newParams;
    });
  };

  const handleSearch = (searchTerm) => {
    handleFilterChange('search', searchTerm);
  };

  // Función para limpiar filtros
  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Contenedor con filtros y listado de ventas */}
        <div className='flex-1 bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold text-gray-900 text-left mb-6'>
            Listado de Ventas
          </h2>
          {/* Contenedor de filtros */}
          <div className='flex flex-col border-b border-gray-200 md:flex-row items-center gap-3 mb-3 pb-4'>
            {/* Buscador de ventas */}
            <SearchBar
              id='search'
              className='flex-1'
              placeholder='Buscar venta...'
              onSearch={handleSearch}
              value={searchParams.get('search') || ''}
            />

            {/* Select Forma de Pago  */}
            <div className='flex-1'>
              <select
                className={`w-full h-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary ${searchParams.get('formapago') ? 'text-gray-800' : 'text-gray-400'}`}
                value={searchParams.get('formapago') || ''}
                onChange={(e) =>
                  handleFilterChange('formapago', e.target.value)
                }
              >
                <option value='' hidden disabled>
                  Forma de pago
                </option>
                <option value='tarjeta de credito'>Tarjeta de crédito</option>
                <option value='tarjeta de debito'>Tarjeta de débito</option>
                <option value='efectivo'>Efectivo</option>
                <option value='transferencia'>Transferencia</option>
              </select>
            </div>

            {/* Filtro por fecha */}
            <div className='flex items-center gap-2 flex-1'>
              <div className='w-1/2'>
                <input
                  type='date'
                  className={`w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary ${searchParams.get('fechadesde') ? 'text-gray-800' : 'text-gray-400'}`}
                  value={searchParams.get('fechadesde') || ''}
                  onChange={(e) =>
                    handleFilterChange('fechadesde', e.target.value)
                  }
                />
              </div>
              <div className='w-1/2'>
                <input
                  type='date'
                  className={`w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary ${searchParams.get('fechahasta') ? 'text-gray-800' : 'text-gray-400'}`}
                  value={searchParams.get('fechahasta') || ''}
                  onChange={(e) =>
                    handleFilterChange('fechahasta', e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Muestra filtros activos */}
          {(searchParams.has('search') ||
            searchParams.has('formapago') ||
            searchParams.has('fechadesde') ||
            searchParams.has('fechahasta')) && (
            <div className='mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-gray-700'>
                  <strong>Filtros activos:</strong>
                  {searchParams.has('search') &&
                    ` Búsqueda: "${searchParams.get('search')}"`}
                  {searchParams.has('formapago') &&
                    ` | Forma de pago: ${searchParams.get('formapago')}`}
                  {searchParams.has('fechadesde') &&
                    ` | Desde: ${formatFechaArgentina(
                      searchParams.get('fechadesde')
                    )}`}
                  {searchParams.has('fechahasta') &&
                    ` | Hasta: ${formatFechaArgentina(
                      searchParams.get('fechahasta')
                    )}`}
                </div>
                <button
                  onClick={handleClearFilters}
                  className='text-sm text-red-600 hover:text-red-800 font-medium transition-colors'
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}

          {/* Tabla de ventas */}
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[640px] table-auto'>
              <thead className='text-sm font-semibold text-gray-600 border-b border-gray-200'>
                <tr>
                  <th className='p-4 text-center'>ID VENTA</th>
                  <th className='p-4 text-center'>EMPLEADO</th>
                  <th className='p-4 text-center'>FECHA</th>
                  <th className='p-4 text-center'>HORA</th>
                  <th className='p-4 text-center'>FORMA DE PAGO</th>
                  <th className='p-4 text-center'>TOTAL DE LA VENTA</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 text-sm text-gray-700'>
                {ventas.map((venta) => (
                  <tr key={venta.idVenta} className='hover:bg-gray-50'>
                    <td className='p-4 text-center'>{venta.idVenta}</td>
                    <td className='p-4 text-center'>
                      {venta.empleado.nombre} {venta.empleado.apellido}
                    </td>
                    <td className='p-4 text-center'>
                      {formatFechaArgentina(venta.fecha)}
                    </td>
                    <td className='p-4 text-center'>
                      {formatHoraArgentina(venta.hora)}
                    </td>
                    <td className='p-4 text-center'>
                      {venta.formapago.descripcion}
                    </td>
                    <td className='p-4 text-center'>
                      {formatPrecio(venta.totalVenta)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mensaje cuando no hay reportes */}
          {(!ventas || ventas.length === 0) && (
            <div className='text-center py-12 text-gray-500'>
              No se encontraron reportes de ventas
            </div>
          )}
        </div>

        {/* Widgets */}
        <div className='w-full lg:w-1/4 flex flex-col gap-4'>
          {/* Total histórico de ventas */}
          <div className='p-4 rounded-lg bg-white shadow-lg'>
            <h3 className='text-m font-medium text-gray-600 text-center'>
              Total de Ventas Histórico
            </h3>
            <p className='mt-2 text-2xl font-semibold text-yellow-400 text-center'>
              {totalVentas}
            </p>
            <p className='mt-1 text-xs text-center text-gray-500'>
              Desde el inicio de operaciones
            </p>
          </div>

          {/* Top 3 productos */}
          <div className='p-4 rounded-lg bg-white shadow-lg'>
            <h3 className='text-m font-medium text-gray-600 text-center'>
              Top 3 Productos Más Vendidos
            </h3>
            <ol className='mt-3 space-y-2'>
              {top3Productos.map((producto, index) => (
                <li
                  key={producto.idProducto}
                  className='flex justify-between items-center'
                >
                  <div className='flex items-center gap-2'>
                    <span className='flex items-center justify-center w-6 h-6 round rounded-full bg-yellow-400 text-white text-xs font-bold'>
                      {index + 1}
                    </span>
                    <span className='text-sm text-gray-700 font-semibold'>
                      {producto.nombre}
                    </span>
                  </div>
                  <span className='text-sm text-gray-600'>
                    {producto.cantidadVendida} unidades
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportesList;
