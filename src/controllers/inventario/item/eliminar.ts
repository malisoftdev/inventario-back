import Item, { IItems } from "../../../models/almacen/items"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let itemEliminar: IItems = new Item(({ _id, activo: false }));
    try {
        let itemEliminado = await itemEliminar.update(itemEliminar);
        res.status(200).json(itemEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Modelo." })
    }
}