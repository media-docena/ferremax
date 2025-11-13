import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ( { children } ) => {

    const [carrito, setCarrito] = useState(() => {
        const saved = localStorage.getItem('ferremax-carrito');
        if (saved) {
            return JSON.parse(saved);        
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('ferremax-carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarProducto = (producto) => {
        setCarrito((carritoActual) => {
            // Buscar si el producto ya está en el carrito
            const productoExistente = carritoActual.find(
                (item) => item.idProducto === producto.idProducto
            );

            if (productoExistente) {
                // Si ya existe en el carrito, notifica que no se puede volver a agregar
                alert(`El producto ya fue agregado en el carrito.`);
                return carritoActual; // No modifica el carrito
            }
                
            if (producto.stock <= 0) {
                alert('No hay stock disponible para este producto');
                return carritoActual; // ← No modifica el carrito
            }
            // Si no existe, agregarlo nuevo
            const precioNumerico = Number(producto.precio);
            return [
                ...carritoActual,
                {
                    idProducto: producto.idProducto,
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    precio: precioNumerico,
                    stock: producto.stock,
                    cantidad: 1,
                    subtotal: precioNumerico,
                },
            ];
        });
    };

    const incrementarCantidad = (idProducto) => {
        setCarrito((carritoActual) => 
            carritoActual.map((item) => {
                if (item.idProducto === idProducto) {
                    if (item.cantidad >= item.stock) {
                        alert(`No puedes agregar más. Stock disponible: ${item.stock}`);
                        return item; // NO MODIFICA el carrito
                    }
                    const nuevaCantidad = item.cantidad + 1;
                    return {
                        ...item,
                        cantidad: nuevaCantidad,
                        subtotal: nuevaCantidad * item.precio,
                    };
                }
                return item;
            })
        );
    };

    const decrementarCantidad = (idProducto) => {
        setCarrito((carritoActual) => 
            carritoActual.map((item) => {
                if (item.idProducto === idProducto) {
                    if (item.cantidad <= 1) {
                        alert('La cantidad no puede ser menor a 1');
                        return item; // NO MODIFICA el carrito
                    }
                    const nuevaCantidad = item.cantidad - 1;
                    return {
                        ...item,
                        cantidad: nuevaCantidad,
                        subtotal: nuevaCantidad * item.precio,
                    };
                }
                return item;
            })
        );
    };

    const actualizarCantidad = (idProducto, cantidad) => {
        if (cantidad <= 0) {
            alert('La cantidad debe ser mayor a 0');
            return;
        };
        setCarrito((carritoActual) => 
            carritoActual.map((item) => {
                if (item.idProducto === idProducto) {
                    const nuevaCantidad = cantidad;
                    if (nuevaCantidad > item.stock) {
                        alert(`No puedes agregar más. Stock disponible: ${item.stock}`);
                        return item; // NO MODIFICA el carrito
                    }
                    return {
                        ...item,
                        cantidad: nuevaCantidad,
                        subtotal: nuevaCantidad * item.precio,
                    };
                }
                return item;
            })
        );
    };

    const eliminarProducto = (idProducto) => { 
        setCarrito((carritoActual) =>
            carritoActual.filter((item) => item.idProducto !== idProducto)
            
        );
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + Number(item.subtotal), 0);
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarProducto,
                incrementarCantidad,
                decrementarCantidad,
                actualizarCantidad,
                eliminarProducto,
                calcularTotal,
                limpiarCarrito,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
    }
    return context;
};