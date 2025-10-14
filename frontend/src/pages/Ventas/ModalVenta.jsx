import React, {useState} from 'react';
import ActionButton from '../../components/common/Buttons/ActionButton';
import TaskAltIcon from  '../../assets/icons/task_alt.svg';

const ModalVenta = ({ onClose, total }) => {

    return (
        <div className='fixed inset-0 bg-gray-800/40 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='text-center justify-center bg-white rounded-lg shadow-xl p-6 w-[350px] h-[450px]'>
                <div className="flex justify-center items-center mb-2">
                    <div className="rounded-full bg-green-100 border-4 border-green-400 flex justify-center items-center w-20 h-20">
                        <img src={TaskAltIcon} alt="Venta exitosa" className="w-12 h-12" />
                    </div>
                </div>
                <div className='text-[30px] font-semibold pt-1 pb-0.25'>¡Venta Exitosa!</div>
                <div className='text-[15px] font-semibold text-gray-600 pb-5'>La venta ha sido registrada correctamente en el sistema.</div>
                <div className='border-1 rounded-sm w-75 h-24'>
                    <div className='flex justify-between p-1 text-gray-700 text-[15px] font-semibold border-b'>
                        <label>ID Venta:</label>
                        <label> 150 </label>
                    </div>
                    <div className='flex justify-between p-1 text-gray-700 text-[15px] font-semibold border-b'>
                        <label>Metodo de Pago:</label>
                        <label>Efectivo</label>
                    </div>
                    <div className='flex justify-between p-1 text-gray-700 text-[15px] font-semibold'>
                        <label>Total Abonado</label>
                        <label>99.19</label>
                    </div>
                    <div className='pt-10'>
                        <ActionButton
                            label='Ver Factura'
                            variant='addValid'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalVenta