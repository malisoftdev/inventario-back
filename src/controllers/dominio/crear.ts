import Dominio, { IDominio } from "../../models/dominio"
import { Request, Response } from "express"

export const crear = async (req: Request, res: Response) => {
    let { codigo, short, nombre, detalle, tipo, } = req.body;

    try {
        let nuevoDominio:IDominio=new Dominio({ codigo, short, nombre, detalle, tipo });
        let dominioGuardado=await nuevoDominio.save();
        res.status(200).json({ message: "Successfuly." });    
    } catch (error) {
        res.status(404).json({ message: "No se pudo crear el dominio" });
    }


    
}