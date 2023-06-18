import Almacen, { IAlmacen } from "../../models/almacen/almacen"
import { Request, Response } from "express"

export const visible = async (req: Request, res: Response) => {
    let { _id, visible } = req.body;
    try {
        let almacenOld: IAlmacen | null = await Almacen.findOne({ _id });

        if (almacenOld) {
            almacenOld.visible=visible;
            await almacenOld.update(almacenOld);
            let menuUpdated=await Almacen.findOne({ _id });
            res.status(200).json(menuUpdated);
        } else {
            res.status(404).json({ message: "Almacen no se encontró." })
        }

    } catch (error) {
        res.status(500).json({ message: "No se pudo gravar el Almacen" });
    }
}