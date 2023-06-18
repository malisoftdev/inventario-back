import Proveedor, { IProveedor } from "../../../models/almacen/proveedor"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    let { _id, nit, nombre,representante,telefono,direccion } = req.body;

    try {
        let proveedorOld: IProveedor | null = await Proveedor.findOne({ _id });
        if (!proveedorOld) return res.status(404).json({ message: "Proveedor no se encontró." });
        proveedorOld.nit = nit;
        proveedorOld.nombre = nombre;
        proveedorOld.representante=representante,
        proveedorOld.telefono=telefono,
        proveedorOld.direccion=direccion,
        await proveedorOld.update(proveedorOld);
        proveedorOld= await Proveedor.findOne({ _id });
        res.status(200).json(proveedorOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el Proveedor" });
    }
}