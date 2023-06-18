import Campo, { ICampo } from "../../../models/almacen/campo"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let campoEliminar: ICampo = new Campo(({ _id, activo: false }));
    try {
        let campoEliminado = await campoEliminar.update(campoEliminar);
        res.status(200).json(campoEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Campo." })
    }
}