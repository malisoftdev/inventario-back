import Campo, { ICampo } from "../../../models/almacen/campo"
import { Request, Response } from "express"
import campo from "../../../models/almacen/campo";
export const crear= async(req:Request,res:Response)=>{
    let { nombre, tipo, estado, categoria } = req.body;
    let campoNuevo:ICampo=new Campo({nombre,tipo, estado, categoria});
    try {
        const campoCreado:ICampo =await (await campoNuevo.save()).populate("categoria").execPopulate();
        res.status(200).json(campoCreado);    
    } catch (error) {
        res.status(404).json({message:"Error Creando el Campo"});
    }    

}