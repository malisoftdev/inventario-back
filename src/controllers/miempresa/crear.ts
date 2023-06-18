import { Request, Response } from "express"
import miempresa, { IMiempresa } from "../../models/miempresa";

export const crear = async (req: Request, res: Response) => {
    //Destructuring body request
    let {
        nombre,
        nit,
        colorOscuro,
        colorClaro,
    } = req.body;

    let nuevaEmpresa: IMiempresa = new miempresa({ nombre, nit, colorOscuro, colorClaro });
    try {
        //save the user new

        let empresaCreada = await nuevaEmpresa.save();

        res.status(200).json(empresaCreada);


    } catch (error) {
        res.status(404).json({ message: "Error al guardar Empresa" });
    }
}