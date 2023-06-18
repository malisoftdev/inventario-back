import Categoria, { ICategoria } from "../../../models/almacen/categoria"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    let { _id, nombre, descripcion } = req.body;

    try {
        let categoriaOld: ICategoria | null = await Categoria.findOne({ _id });
        if (!categoriaOld) return res.status(404).json({ message: "Categoria no se encontró." });
        categoriaOld.nombre = nombre;
        categoriaOld.descripcion = descripcion;
        await categoriaOld.update(categoriaOld);
        categoriaOld= await Categoria.findOne({ _id });
        res.status(200).json(categoriaOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar la categoria" });
    }
}