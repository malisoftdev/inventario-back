import Precio, { IPrecio } from "../../../models/almacen/precio"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let precioEliminar: IPrecio = new Precio(({ _id, activo: false }));
    try {
        let precioEliminado = await precioEliminar.update(precioEliminar);
        res.status(200).json(precioEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Precio." })
    }
}