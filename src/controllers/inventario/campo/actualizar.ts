import Campo, { ICampo } from "../../../models/almacen/campo"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    let { _id, nombre, tipo, estado, categoria } = req.body;

    try {
        let campoOld: ICampo | null = await Campo.findOne({ _id });
        if (!campoOld) return res.status(404).json({ message: "campo no se encontró." });
        
        campoOld.nombre = nombre;
        campoOld.tipo = tipo;
        campoOld.estado = estado;
        campoOld.categoria = categoria;

        await campoOld.update(campoOld);
        campoOld= await Campo.findOne({ _id }).populate("categoria").exec();
        res.status(200).json(campoOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar la campo" });
    }
}