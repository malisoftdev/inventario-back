import Marca, { IMarca } from "../../../models/almacen/marca"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    let { _id, nombre, descripcion } = req.body;

    try {
        let marcaOld: IMarca | null = await Marca.findOne({ _id });
        if (!marcaOld) return res.status(404).json({ message: "Marca no se encontró." });
        marcaOld.nombre = nombre;
        marcaOld.descripcion = descripcion;
        await marcaOld.update(marcaOld);
        marcaOld= await Marca.findOne({ _id });
        res.status(200).json(marcaOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar la Marca" });
    }
}