import Modelo, { IModelo } from "../../../models/almacen/modelo"
import { Request, Response } from "express"
export const crear= async(req:Request,res:Response)=>{
    let {marca, nombre,descripcion}=req.body;
    console.log({nombre,descripcion,marca})
    let modeloNueva:IModelo=new Modelo({nombre,descripcion,marca});
    try {
        let modeloCreado:IModelo =await modeloNueva.save();
        res.status(200).json(modeloCreado);    
    } catch (error) {
        res.status(500).json({message:"Error Creando la Modelo"});
        console.log(error)
    }    

}