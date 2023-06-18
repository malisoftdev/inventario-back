import { Request, Response } from "express"

import { asyncForEach } from "../../utils"
import { TranspasarProcedure } from "./procedures/TranspasarProcedure";
import { Procedure } from "./abstracts/Procedure";

export default async (req: Request, res: Response) => {
    let { fecha, glosa, sucursalDestino, almacenHasta, almacenDesde, itemsTranspasar } = req.body;

    //console.log({ sucursalDestino, almacenHasta, almacenDesde, itemsTranspasar })
    if (sucursalDestino._id == ''!) return res.status(404).json({ message: "No hay una Sucursal Destino" });
    if (almacenHasta._id == ''!) return res.status(404).json({ message: "No hay un Almacen Destino" });
    if (almacenDesde._id == ''!) return res.status(404).json({ message: "No hay un Almacen Destino" });
    if (itemsTranspasar.length < 1) return res.status(404).json({ message: "No hay items que traspasar" });

    if(!fecha)return res.status(404).json({message:"No hay fecha."})
    let nuevaTransferencia: Procedure = new TranspasarProcedure(almacenDesde, almacenHasta, itemsTranspasar,fecha,glosa);
    let validation:boolean = await nuevaTransferencia.validate();

    if (validation) {
        await nuevaTransferencia.exec();
        res.status(200).json({ movimiento: nuevaTransferencia.getDocument() });
    }else{
        console.log(nuevaTransferencia.getMessage());
        res.status(404).json({ message: nuevaTransferencia.getMessage()});
    }    
}
