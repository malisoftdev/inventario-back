import Precio, { IPrecio } from "../../../models/almacen/precio"
import { Request, Response } from "express"

export const crear = async (req: Request, res: Response) => {
    let { nombre, descripcion } = req.body;    
    let precioNuevo: IPrecio = new Precio({ nombre, descripcion });
    try {
        let precioCreado: IPrecio = await precioNuevo.save();
        res.status(200).json(precioCreado);
    } catch (error) {
        res.status(500).json({ message: "Error Creando el Precio" });
    }
}