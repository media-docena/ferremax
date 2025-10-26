-- CreateTable
CREATE TABLE `Categoria` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleVenta` (
    `idDetalleVenta` INTEGER NOT NULL AUTO_INCREMENT,
    `idVenta` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `subtotal` DECIMAL(10, 2) NULL,

    INDEX `idProducto`(`idProducto`),
    INDEX `idVenta`(`idVenta`),
    PRIMARY KEY (`idDetalleVenta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleados` (
    `idEmpleado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `dni` VARCHAR(20) NOT NULL,
    `direccion` VARCHAR(100) NULL,
    `telefono` VARCHAR(20) NULL,
    `estado` ENUM('activo', 'inactivo') NULL DEFAULT 'activo',
    `fechaCreacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `dni`(`dni`),
    PRIMARY KEY (`idEmpleado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormaPago` (
    `idFormaPago` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idFormaPago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Marca` (
    `idMarca` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idMarca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoProveedor` (
    `idProdProv` INTEGER NOT NULL AUTO_INCREMENT,
    `idProducto` INTEGER NOT NULL,
    `idProveedor` INTEGER NOT NULL,

    INDEX `idProducto`(`idProducto`),
    INDEX `idProveedor`(`idProveedor`),
    PRIMARY KEY (`idProdProv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `idProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NULL DEFAULT 0,
    `stockMin` INTEGER NULL DEFAULT 5,
    `idCategoria` INTEGER NULL,
    `idMarca` INTEGER NULL,
    `fechaVencimiento` DATE NULL,
    `estado` ENUM('activo', 'inactivo') NULL DEFAULT 'activo',
    `fechaCreacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idCategoria`(`idCategoria`),
    INDEX `idMarca`(`idMarca`),
    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductosUnidad` (
    `idProdUnidad` INTEGER NOT NULL AUTO_INCREMENT,
    `idProducto` INTEGER NOT NULL,
    `idUnidad` INTEGER NOT NULL,

    INDEX `idProducto`(`idProducto`),
    INDEX `idUnidad`(`idUnidad`),
    PRIMARY KEY (`idProdUnidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedor` (
    `idProveedor` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(20) NULL,
    `direccion` VARCHAR(100) NULL,
    `correo` VARCHAR(100) NULL,
    `estado` ENUM('activo', 'inactivo') NULL DEFAULT 'activo',

    PRIMARY KEY (`idProveedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unidad` (
    `idUnidad` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `abreviatura` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`idUnidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `idEmpleado` INTEGER NULL,
    `estado` ENUM('activo', 'inactivo') NULL DEFAULT 'activo',
    `fechaCreacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `correo`(`correo`),
    INDEX `idEmpleado`(`idEmpleado`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuariosRol` (
    `idUsuRol` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idRol` INTEGER NOT NULL,

    INDEX `idRol`(`idRol`),
    INDEX `idUsuario`(`idUsuario`),
    PRIMARY KEY (`idUsuRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ventas` (
    `idVenta` INTEGER NOT NULL AUTO_INCREMENT,
    `idEmpleado` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `hora` TIME(0) NOT NULL,
    `idFormaPago` INTEGER NOT NULL,
    `totalVenta` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `fechaCreacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idEmpleado`(`idEmpleado`),
    INDEX `idFormaPago`(`idFormaPago`),
    PRIMARY KEY (`idVenta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `detalleventa_ibfk_1` FOREIGN KEY (`idVenta`) REFERENCES `Ventas`(`idVenta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `detalleventa_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `Productos`(`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductoProveedor` ADD CONSTRAINT `productoproveedor_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `Productos`(`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductoProveedor` ADD CONSTRAINT `productoproveedor_ibfk_2` FOREIGN KEY (`idProveedor`) REFERENCES `Proveedor`(`idProveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`idMarca`) REFERENCES `Marca`(`idMarca`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductosUnidad` ADD CONSTRAINT `productosunidad_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `Productos`(`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductosUnidad` ADD CONSTRAINT `productosunidad_ibfk_2` FOREIGN KEY (`idUnidad`) REFERENCES `Unidad`(`idUnidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idEmpleado`) REFERENCES `Empleados`(`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UsuariosRol` ADD CONSTRAINT `usuariosrol_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UsuariosRol` ADD CONSTRAINT `usuariosrol_ibfk_2` FOREIGN KEY (`idRol`) REFERENCES `Rol`(`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`idEmpleado`) REFERENCES `Empleados`(`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`idFormaPago`) REFERENCES `FormaPago`(`idFormaPago`) ON DELETE NO ACTION ON UPDATE NO ACTION;
