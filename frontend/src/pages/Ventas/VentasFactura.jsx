import React from "react";
import ActionButton from "../../components/common/Buttons/ActionButton";
import LogoIcon from "../../assets/icons/logo.svg";

function VentasFactura() {

    const productsSell= [
        {
        id: '005',
        name: 'Taladro Inalámbrico',
        category: 'Herramientas Eléctricas',
        price: '$89.99',
        stock: 1,
        },
        {
        id: '006',
        name: 'Cinta métrica',
        category: 'Herramientas de Medición',
        price: '$9.20',
        stock: 1,
        }
    ];

    return (
        <div className="flex justify-center gap-6">
            <div>
                <div className="w-175 bg-white p-6 rounded-lg shadow-lg"> 
                    <div className="flex justify-between text-[25px] font-semibold">
                        <h2>Comprobante</h2>
                        <div className="flex items-center">
                            <img src={LogoIcon} alt="FerreMax" className="size-15" />
                            <p>FerreMax</p>
                        </div>
                        
                    </div>
                    <div className="text-lg mt-5">
                        <h3>Información de la Venta</h3>
                    </div>
                    <div className="flex justify-between gap-6 mt-5 text-md">
                        <div>
                            <p>Numero de Factura</p>
                            <p>150</p>
                            <p className="mt-5">Forma de Pago</p>
                            <p>Efectivo</p>
                        </div>
                        <div>
                            <p>Fecha</p>
                            <p>14 de Octubre, 2025 14:30</p>
                            <p className="mt-5">Empleado</p>
                            <p>#2</p>
                        </div>
                    </div>
                    <div className="mt-5 text-lg">
                        <h3>Detalle de los Articulos</h3>
                    </div>
                    <div className="overflow-x-auto mt-5">
                        <table className="w-full whitspace-nowrap">
                            <thead className="text-left border-b border-gray-200">
                                <tr className="">
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                {productsSell.map((product) => (
                                    <tr>
                                        <th className="pt-2">{product.name}</th>
                                        <th className="pt-2">{product.stock}</th>
                                        <th className="pt-2">{product.price}</th>
                                        <th className="pt-2">{product.price}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex mt-5 text-lg">
                        <div className="mt-5">
                            <p className="mt-5 mr-25">Subtotal</p>
                            <p className="mt-5 mr-25">Total</p>
                        </div>
                        <div className="mt-5">
                            <p className="mt-5">$99.19</p>
                            <p className="mt-5">$99.19</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <ActionButton
                        label="Descargar"
                        variant="addValid"
                    />
                </div>
            </div>
        </div>
    );
}

export default VentasFactura