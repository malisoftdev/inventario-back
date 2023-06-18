import Categoria, { ICategoria } from "../../../models/almacen/categoria"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let categoriaEliminar: ICategoria = new Categoria(({ _id, activo: false }));
    try {
        let categoriaEliminado = await categoriaEliminar.update(categoriaEliminar);
        res.status(200).json(categoriaEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Categoria." })
    }
}