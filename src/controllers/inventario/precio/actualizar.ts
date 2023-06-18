import Precio, { IPrecio } from "../../../models/almacen/precio"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    let { _id, nombre, descripcion } = req.body;

    try {
        let precioOld: IPrecio | null = await Precio.findOne({ _id });
        if (!precioOld) return res.status(404).json({ message: "Precio no se encontró." });
        precioOld.nombre = nombre;
        precioOld.descripcion = descripcion;
        await precioOld.update(precioOld);
        precioOld= await Precio.findOne({ _id });
        res.status(200).json(precioOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el Precio" });
    }
}