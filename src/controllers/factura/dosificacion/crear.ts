import { Request, Response } from "express"
import dosificacion, { IDosificacion } from "../../../models/facturacion/dosificacion";

export const crear = async (req: Request, res: Response) => {
    //Destructuring body request
    let {
        sucursal,
        autorizacion,
        llave,
        fechaLimite,
        inicial,
        nroFactura,
        tramite,
        leyenda,
        tipo,
        estado
    } = req.body;

    let nuevaDosificacion: IDosificacion = new dosificacion({
        sucursal,
        autorizacion,
        llave,
        fechaLimite,
        inicial,
        nroFactura,
        tramite,
        leyenda,
        tipo,
        estado
    });
    try {
        //save the user new
        try {
            const deshabilitado = await dosificacion.updateMany({ sucursal: sucursal._id }, { estado: 0 });

            let dosificacionCreada = await nuevaDosificacion.save();
            res.status(200).json(dosificacionCreada);

        } catch (e) {
            res.status(404).json({ message: "Error al desactivar:  " + e });
        }



    } catch (error) {
        res.status(404).json({ message: "Error al guardar Dosificacion:  " + error });
    }
}