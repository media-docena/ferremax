import React, {useState} from 'react';
import ModalVenta from './ModalVenta'
import ActionButton from '../../components/common/Buttons/ActionButton';

const ModalPago = ({ total, onClose, onOpen }) => {

    const paymentMethods = [
        { id: 1, label: 'Efectivo' },
        { id: 2, label: 'Tarjeta de Crédito' },
        { id: 3, label: 'Transferencia Bancaria' },
        { id: 4, label: 'Tarjeta de Débito' },
    ];

    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id)

    const handleSelectChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <div className='fixed inset-0 bg-gray-800/40 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-xl p-6 w-[400px] h-[300px] text-center'>
                <div className='text-sm font-semibold text-gray-600'>Total de la Venta</div>
                <div className='text-[50px] font-semibold pb-5'>${Number(total).toLocaleString('es-AR')}</div>
                <div className='flex pb-15 text-center justify-center'>
                    <div className='text-sm font-semibold text-gray-600 p-2'>Forma de Pago</div>
                    <select 
                        id="pagoSelect" 
                        value={paymentMethod} 
                        onChange={handleSelectChange}
                        className='text-sm font-semibold text-black p-2'
                    >
                        {paymentMethods.map((metodo) => (
                            <option key={metodo.id} value={metodo.id}>
                                {metodo.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex justify-between'>
                    <div className='p-2 w-full'>
                        <ActionButton
                            label='Volver'
                            variant='backPayment'
                            onClick={onClose}
                        />
                    </div>
                    <div className='p-2 w-full'>
                        <ActionButton
                            label='Confirmar Venta'
                            variant='continuePayment'
                            onClick={() => onOpen(Number(paymentMethod))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalPago