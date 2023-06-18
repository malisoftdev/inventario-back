import Sucursal, { ISucursal } from "../../models/sucursal"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let sucursalEliminar: ISucursal = new Sucursal(({ _id, activo: false }));
    try {
        let sucursalEliminado = await sucursalEliminar.update(sucursalEliminar);
        res.status(200).json(sucursalEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Categoria." })
    }
}