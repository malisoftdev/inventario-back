import Proveedor, { IProveedor } from "../../../models/almacen/proveedor"
import { Request, Response } from "express";

export const listar = async (req: Request, res: Response) => {


    let { nit, nombre } = req.body;
    let proveedorResult: IProveedor[] = await Proveedor.find({
        $or: [
            {
                nit: new RegExp(nit, 'i')
            },
            {
                nombre: new RegExp(nombre, 'i')
            },
        ],
        activo: true,
    });
    res.status(200).json(proveedorResult);

}