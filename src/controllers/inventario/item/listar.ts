import Item, { IItems } from "../../../models/almacen/items"
import { Request, Response } from "express";

export const listar = async (req: Request, res: Response) => {
    let { _id } = req.body;

    try {
        if (_id) {
            let itemResult: IItems | null = await Item.findOne({
                _id
            })
                .populate("categoria")
                .populate("marca")
                .populate("modelo")
                .populate("proveedor").exec();
        
            if (!itemResult) return res.status(404).json({ message: "Producto no encontrado." })
            res.status(200).json(itemResult);

        } else {
            let { nombre } = req.body;
            let itemResult: IItems[] = await Item.find({
                $or: [
                    {
                        nombre: new RegExp(nombre, 'i')
                    },
                ],
                activo: true
            })
                .populate("categoria")
                .populate("marca")
                .populate("modelo")
                .populate("proveedor");
            res.status(200).json(itemResult);
        }
    } catch (error) {
        res.status(500).json({ message: "Error buscando los Productos." })
    }

}