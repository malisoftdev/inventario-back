import Proveedor, { IProveedor } from "../../../models/almacen/proveedor"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let proveedorEliminar: IProveedor = new Proveedor(({ _id, activo: false }));
    try {
        let proveedorEliminado = await proveedorEliminar.update(proveedorEliminar);
        res.status(200).json(proveedorEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Proveedor." })
    }
}