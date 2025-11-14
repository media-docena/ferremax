import React, { useRef } from "react";
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ActionButton from "../../components/common/Buttons/ActionButton";
import LogoIcon from "../../assets/icons/logo.svg";
import { useLoaderData } from 'react-router';
import { formatFecha, formatHora } from "../../helpers/carritoVentaHelper";
import logger from "../../../config/logger";
import { buildFacturaDocDefinition } from '../../helpers/pdfmakeFacturaHelper';

function VentasFactura() {

    const { venta, status, message } = useLoaderData();

    const facturaRef = useRef();

    const handleDescargarPDF = async () => {
        try {
            const pdfMakeModule = await import('pdfmake/build/pdfmake');
            const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

            const pdfMake = pdfMakeModule?.default || pdfMakeModule;
            if (pdfFontsModule?.pdfMake?.vfs) {
                pdfMake.vfs = pdfFontsModule.pdfMake.vfs;
            } else if (pdfFontsModule?.vfs) {
                pdfMake.vfs = pdfFontsModule.vfs;
            } else if (pdfFontsModule?.default?.vfs) {
                pdfMake.vfs = pdfFontsModule.default.vfs;
            }

            let logoSvg = null;
            try {
                const res = await fetch(LogoIcon);
                const text = await res.text();
                if (text && text.includes('<svg')) logoSvg = text;
            } catch {}

            const dd = buildFacturaDocDefinition(venta, { logoSvg });
            pdfMake.createPdf(dd).download(`Factura_${venta.idVenta}_FerreMax.pdf`);
        } catch (error) {
            logger.error('Error al generar la factura con pdfmake', { error });
        }
    };

    

    if (status === 404 || !venta) {
        return <p className="text-red-600">{message || 'No se encontró la venta'}</p>;
    }

    // Calcular subtotal real a partir del detalle
    const subtotal = Array.isArray(venta.detalleventa)
        ? venta.detalleventa.reduce((sum, item) => sum + Number(item.subtotal || 0), 0)
        : 0;

    const breadcrumbItems = [
    { label: 'Ventas', href: '#' },
    { label: 'Comprobante' },
    ]

    return (
        <div>
            <Breadcrumbs items = {breadcrumbItems}/>
            <div className="flex justify-center gap-6">
                <div>
                    <div id="factura-export" ref={facturaRef} className="w-175 bg-white p-6 rounded-lg shadow-lg"> 
                        <div className="flex justify-between text-[25px] font-semibold">
                            <h2>Comprobante</h2>
                            <div className="flex items-center">
                                <img src={LogoIcon} alt="FerreMax" className="size-15" />
                                <p>FerreMax</p>
                            </div>
                        </div>
                        <div className="text-lg mt-5">
                            <h3 className="font-semibold">Información de la Venta</h3>
                        </div>
                        <div className="flex justify-between gap-6 mt-5 text-md">
                            <div>
                                <p className="font-semibold">Numero de Factura</p>
                                <p># {venta.idVenta}</p>
                                <p className="mt-5 font-semibold">Forma de Pago</p>
                                <p>{venta.formapago?.descripcion || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Fecha</p>
                                <p>{formatFecha(venta.fecha)}, {formatHora(venta.hora)}</p>
                                <p className="mt-5 font-semibold">Empleado</p>
                                <p># {venta.empleado?.idEmpleado}</p>
                            </div>
                        </div>
                        <div className="mt-5 text-lg">
                            <h3 className="font-semibold">Detalle de los Articulos</h3>
                        </div>
                        <div className="overflow-x-auto mt-5">
                            <table className="w-full">
                                <colgroup>
                                    <col style={{ width: '50%' }} />
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '17.5%' }} />
                                    <col style={{ width: '17.5%' }} />
                                </colgroup>
                                <thead className="text-left border-b border-gray-200">
                                    <tr>
                                        <th>Producto</th>
                                        <th className="text-center">Cantidad</th>
                                        <th className="text-center">Precio Unitario</th>
                                        <th className="text-center">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="text-left">
                                    {venta.detalleventa?.map((product) => (
                                        <tr key={product.idDetalleVenta}>
                                            <td className="pt-2">{product.producto?.nombre}</td>
                                            <td className="pt-2 text-center">{product.cantidad}</td>
                                            <td className="pt-2 text-center">${Number(product.precio).toLocaleString('es-AR')}</td>
                                            <td className="pt-2 text-center">${Number(product.subtotal).toLocaleString('es-AR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex mt-5 text-lg">
                            <div className="mt-5">
                                <p className="mt-5 mr-25 font-semibold">Subtotal</p>
                                <p className="mt-5 mr-25 font-semibold">Total</p>
                            </div>
                            <div className="mt-5">
                                <p className="mt-5">${Number(subtotal).toLocaleString('es-AR')}</p>
                                <p className="mt-5">${Number(venta.totalVenta).toLocaleString('es-AR')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        <ActionButton
                            label="Descargar"
                            variant="addValid"
                            onClick={handleDescargarPDF}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VentasFactura