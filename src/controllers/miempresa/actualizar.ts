import { Request, Response } from "express"
import Usuario, { IMiempresa } from "../../models/miempresa"
export const actualizar = async (req: Request, res: Response) => {
    let { _id, nombre, nit, colorOscuro, colorClaro } = req.body;
    let empresaOld: IMiempresa | null = await Usuario.findOne({ _id });
    if (empresaOld) {//si existe ese ID
        empresaOld.nombre = nombre;
        empresaOld.nit = nit;
        empresaOld.colorOscuro = colorOscuro;
        empresaOld.colorClaro = colorClaro;
        let empresaActualizado: IMiempresa = await empresaOld.update(empresaOld);
        res.status(200).json(empresaActualizado);
    } else {//si no existe ese ID
        res.status(404).json({ message: "error al actualizar Empresa" })
    }
}