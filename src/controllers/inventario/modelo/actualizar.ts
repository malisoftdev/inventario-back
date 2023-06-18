import Modelo, { IModelo } from "../../../models/almacen/modelo"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    let { _id, nombre, descripcion } = req.body;

    try {
        let modeloOld: IModelo | null = await Modelo.findOne({ _id });
        if (!modeloOld) return res.status(404).json({ message: "Modelo no se encontró." });
        modeloOld.nombre = nombre;
        modeloOld.descripcion = descripcion;
        await modeloOld.update(modeloOld);
        modeloOld= await Modelo.findOne({ _id });
        res.status(200).json(modeloOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el Modelo" });
    }
}