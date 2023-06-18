import Item, { IItems } from "../../../models/almacen/items"
import { Request, Response, text } from "express"
import { ValidateSufijo } from "./classes/validateSufijoClass";

export const actualizar = async (req: Request, res: Response) => {
    let { _id, sufijo, codigo, codBarras, nombre, descripcion, peresedero, categoria, marca, proveedor, modelo } = req.body;
    try {
        let itemOld: IItems | null = await Item.findOne({ _id });
        if (!itemOld) return res.status(404).json({ message: "No se encontró Producto." });
        if(sufijo==itemOld.sufijo!){
            let validation=new ValidateSufijo(sufijo);
            let validationResult=await validation.validate();
            if(validationResult!) return res.status(500).json({ message: "No Válido" });
        }
        itemOld.sufijo=sufijo;
        itemOld.codigo=codigo;
        itemOld.codBarras=codBarras;
        itemOld.nombre = nombre;
        itemOld.peresedero=peresedero;
        itemOld.descripcion = descripcion;
        /* itemOld.textoCliente = textoCliente; */
        itemOld.categoria=categoria;
        itemOld.marca=marca;
        itemOld.proveedor=proveedor;
        itemOld.modelo=modelo;
        await itemOld.update(itemOld);
        itemOld= await Item.findOne({ _id }).populate("categoria").exec();
        res.status(200).json(itemOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el Producto" });
    }
}