import Almacen, { IAlmacen } from "../../models/almacen/almacen"
import { Request, Response } from "express";

export const listar = async (req: Request, res: Response) => {

    let { _id, sucursal } = req.body;
    try {
        if (_id) {
            let almacenResult: IAlmacen | null = await Almacen.findOne({
                _id,
                visible: true
            })
                .populate("sucursal")
                .exec();

            if (!almacenResult) return res.status(404).json({ message: "Almacen no encontrado." })
            res.status(200).json(almacenResult);

        } else if (sucursal) {
            let almacenResult: IAlmacen[] = await Almacen.find({
                sucursal,
                visible: true
            })
                .populate("sucursal")
                .exec();
            res.status(200).json(almacenResult);
        } else {
            let { nombre } = req.body;
            let almacenResult: IAlmacen[] = await Almacen.find({
                $or: [
                    {
                        nombre: new RegExp(nombre, 'i')
                    },
                ],
                activo: true
            })
                .populate("sucursal");
            res.status(200).json(almacenResult);
        }
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo los Almacenes." })
    }
}