import Precio, { IPrecio } from "../../../models/almacen/precio"
import { Request, Response } from "express";

export const listar = async (req: Request, res: Response) => {
    let { categoria,nombre, descripcion } = req.body;

    if (categoria) {
        const precioResult: IPrecio[] = await Precio.find({
            $or: [
                {
                    nombre: new RegExp(nombre, 'i')
                },
                {
                    descripcion: new RegExp(descripcion, 'i')
                },
            ],
            categoria,
            activo: true
        });
        res.status(200).json(precioResult);
    }
    else {
        const precioResult: IPrecio[] = await Precio.find({
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
        res.status(200).json(precioResult);
    }
}