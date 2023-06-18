import Categoria, { ICategoria } from "../../../models/almacen/categoria"
import { Request, Response } from "express"
export const crear= async(req:Request,res:Response)=>{
    const {nombre,descripcion}=req.body;
    let categoriaNueva:ICategoria=new Categoria({nombre,descripcion});
    try {
        const categoriaCreado:ICategoria =await categoriaNueva.save();
        res.status(200).json(categoriaCreado);    
    } catch (error) {
        res.status(404).json({message:"Error Creando la Categoria."});
    }    

}