import Almacen, { IAlmacen } from "../../models/almacen/almacen"
import { Request, Response } from "express"
export const crear = async (req: Request, res: Response) => {
    let { sucursal, nombre, detalle, central, visible } = req.body;
    let almacenNuevo: IAlmacen = new Almacen({ sucursal, nombre, detalle, central, visible });

    try {
        let almacenCreado: IAlmacen = await (await almacenNuevo.save()).populate("sucursal").execPopulate();
        res.status(200).json(almacenCreado);
    } catch (error) {
        res.status(500).json({ message: "Error Creando el Item" });
        console.log(error)
    }

}