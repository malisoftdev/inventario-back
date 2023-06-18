import Marca, { IMarca } from "../../../models/almacen/marca"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let marcaEliminar: IMarca = new Marca(({ _id, activo: false }));
    try {
        let marcaEliminado = await marcaEliminar.update(marcaEliminar);
        res.status(200).json(marcaEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Categoria." })
    }
}