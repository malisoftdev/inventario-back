import Campo, { ICampo } from "../../../models/almacen/campo"
import { Request, Response } from "express"

export const activar = async (req: Request, res: Response) => {
    let { _id } = req.body;

    try {
        let campoOld: ICampo | null = await Campo.findOne({ _id });
        if (!campoOld) return res.status(404).json({ message: "Campo no se encontró." });
        campoOld.estado = true;
        await campoOld.update(campoOld);
        res.status(200).json({message:"Activated Sucessfuly"});
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar la campo" });
    }
}