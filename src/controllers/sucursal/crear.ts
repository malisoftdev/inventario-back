import Sucursal, { ISucursal } from "../..//models/sucursal"
import Almacen, { IAlmacen } from "../..//models/almacen/almacen"
import { Request, Response } from "express"
export const crear = async (req: Request, res: Response) => {
    const {
        miempresa,
        nombre,
        direccion,
        zona,
        idcuidad,
        telefono,
        activad,
        idEncargadoPer,
        nroVenta,
        nroNota,
        nroGasto,
        web,
        latlng,
        nroLote,
        nroCotizacion,
        nroCatalogo,
        casaMatriz,
        crearAlmacen,
        estado
    } = req.body;
    let sucursalNueva: ISucursal = new Sucursal({ miempresa, nombre, direccion, zona, idcuidad, telefono, activad, idEncargadoPer, nroVenta, nroNota, nroGasto, web, latlng, nroLote, nroCotizacion, nroCatalogo, casaMatriz, estado });
    try {
        const sucursalCreado: ISucursal = await sucursalNueva.save();
        if (crearAlmacen) {
            var central = true;
            var visible = true;
            let nuevoAlmacen: IAlmacen = new Almacen({ nombre, central, visible });
            const almacenCreada: IAlmacen = await nuevoAlmacen.save();
        }
        res.status(200).json(sucursalCreado);
    } catch (error) {
        res.status(404).json({ message: "Error al crear Sucursal" });
    }

}