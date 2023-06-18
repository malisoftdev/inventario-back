import { Request, Response } from "express";
import Sucursal, { ISucursal } from "../../models/sucursal"

export const listar = async (req: Request, res: Response) => {
    let { nombre } = req.body;
    const sucursalResult: ISucursal[] = await Sucursal.find({
        $or: [
            {
                nombre: new RegExp(nombre, 'i')
            },
        ],
        activo:true
    });
    res.status(200).json(sucursalResult);
}