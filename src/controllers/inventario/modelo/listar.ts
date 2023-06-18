import Modelo, { IModelo } from "../../../models/almacen/modelo"
import { Request, Response } from "express";

export const listar = async (req: Request, res: Response) => {
    let { marca } = req.body;
    let modeloResult: IModelo[];
    if (marca) {
        console.log("buscando por marca")
        modeloResult = await Modelo.find({ marca ,activo: true});

    } else {
        console.log("Buscando por nombre o descripcion")
        let { nombre, descripcion } = req.body;
        modeloResult = await Modelo.find({
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
    }
    res.status(200).json(modeloResult);


}