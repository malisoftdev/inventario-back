import Item, { IItems } from "../../../models/almacen/items"
import { Request, Response, text } from "express"

export const textoActualizar = async (req: Request, res: Response) => {
    let { _id, textoCliente } = req.body;

    try {
        let itemOld: IItems | null = await Item.findOne({ _id });
        if (!itemOld) return res.status(404).json({ message: "No se encontró Producto." });
        itemOld.textoCliente = textoCliente;
        await itemOld.update(itemOld);
        itemOld= await Item.findOne({ _id }).populate("categoria").exec();
        res.status(200).json(itemOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el Producto" });
    }
}