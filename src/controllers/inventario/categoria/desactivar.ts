import Categoria, { ICategoria } from "../../../models/almacen/categoria"
import { Request, Response } from "express"

export const desactivar = async (req: Request, res: Response) => {
    let { _id } = req.body;

    try {
        let categoriaOld: ICategoria | null = await Categoria.findOne({ _id });
        if (!categoriaOld) return res.status(404).json({ message: "Categoria no se encontró." });
        categoriaOld.estado = false;
        await categoriaOld.update(categoriaOld);
        res.status(200).json({message:"Deactivated Sucessfuly"});
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar la Categoria" });
    }
}