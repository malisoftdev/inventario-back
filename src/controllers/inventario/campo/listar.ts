import Campo, { ICampo } from "../../../models/almacen/campo"
import { Request, Response } from "express";

export const listar = async (req: Request, res: Response) => {
    let { estado } = req.body;
    let campoResult: ICampo[];
    if (estado) {
        let { categoria } = req.body;
        if (categoria) {
            let { nombre } = req.body;
            campoResult = await Campo.find({
                $or: [
                    {
                        nombre: new RegExp(nombre, 'i')
                    },
                ],
                activo: true,
                estado: true,
                categoria,
            });
            res.status(200).json(campoResult);
        } else {
            let { nombre } = req.body;
            campoResult = await Campo.find({
                $or: [
                    {
                        nombre: new RegExp(nombre, 'i')
                    },
                ],
                activo: true,
                estado: true,
            });
            res.status(200).json(campoResult);
        }
    } else {
        let { nombre } = req.body;
        campoResult = await Campo.find({
            $or: [
                {
                    nombre: new RegExp(nombre, 'i')
                }
            ],
            activo: true
        }).populate("categoria");
        res.status(200).json(campoResult);
    }
}