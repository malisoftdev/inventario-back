import { Request, Response } from "express"
import Miempresa, { IMiempresa } from "../../models/miempresa"
export const ver = async (req: Request, res: Response) => {
    let { _id, nombre, nit, colorOscuro, colorClaro } = req.body;
    let empresaOld: IMiempresa[] = await Miempresa.find().sort({ $natural: -1 }).limit(1);
    if (empresaOld) {//si existe ese ID
        res.status(200).json(empresaOld[0]);
    } else {//si no existe ese ID
        res.status(404).json({ message: "error al actualizar Empresa" })
    }
}