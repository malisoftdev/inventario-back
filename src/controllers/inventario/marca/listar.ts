import Marca, { IMarca } from "../../../models/almacen/marca"
import { Request, Response } from "express";

export const listar = async (req: Request, res: Response) => {
    let { _id, nombre, descripcion } = req.body;
    const marcaResult: IMarca[] = await Marca.find({
        $or: [
            {
                nombre: new RegExp(nombre, 'i')
            },
            {
                descripcion: new RegExp(descripcion, 'i')
            },
        ],
        activo: true
    });
    res.status(200).json(marcaResult);
}