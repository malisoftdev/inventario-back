import { Request, Response } from "express";
import Dosificacion, { IDosificacion } from "../../../models/facturacion/dosificacion"

export const listar = async (req: Request, res: Response) => {

    try {
        let {
            _id
        } = req.body;
        const listaDos = await Dosificacion.find({ sucursal: _id })
            .populate('sucursal', { nombre: 1 });
        if (!listaDos) {
            res.status(404).send({
                message: "No existen registros"
            });
        } else {
            res.status(200).json(listaDos);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrio un Error'
        });
    }
}