import Marca, { IMarca } from "../../../models/almacen/marca"
import { Request, Response } from "express"
import Modelo,{ IModelo } from "../../../models/almacen/modelo";
export const crear = async (req: Request, res: Response) => {
    let { nombre, descripcion, modelos } = req.body;    
    let modelosNuevos:IModelo;
    let marcaNueva: IMarca = new Marca({ nombre, descripcion });
    try {
        modelos.forEach(async (modelo:IModelo) => {
            modelosNuevos=new Modelo({nombre:modelo.nombre,descripcion:modelo.descripcion,marca:marcaNueva._id});
            await modelosNuevos.save();
        });
        const marcaCreado: IMarca = await marcaNueva.save();
        res.status(200).json(marcaCreado);
    } catch (error) {
        res.status(500).json({ message: "Error Creando la Marca" });
        console.log(error)
    }
}