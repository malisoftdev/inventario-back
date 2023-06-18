import Modelo, { IModelo } from "../../../models/almacen/modelo"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    console.log(req.body)
    let modeloEliminar: IModelo = new Modelo(({ _id, activo: false }));
    try {

        let modeloEliminado = await modeloEliminar.update(modeloEliminar);
        console.error("estos son los datos aelminar")
        console.error({_id})
        console.log(modeloEliminar);
        let modeloconsultado=await Modelo.findOne({_id})
        console.log(modeloconsultado)
        res.status(200).json(modeloEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Modelo." })
    }
}