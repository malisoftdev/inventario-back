import Dominio, { IDominio } from "../../models/dominio"
import { Request, Response } from "express";

export const listar = async (req: Request, res: Response) => {
    let { codigo, nombre, detalle, tipo } = req.body;
    const dominioResult: IDominio[] = await Dominio.find({
        $or: [
            /*
            {
                codigo: new RegExp(codigo, 'i')
            },
            {
                nombre: new RegExp(nombre, 'i')
            },
            {
                detalle: new RegExp(detalle, 'i')
            },
            */
            {
                tipo: new RegExp(tipo, 'i')
            }
        ],
        activo: true
    });
    res.status(200).json(dominioResult);
}