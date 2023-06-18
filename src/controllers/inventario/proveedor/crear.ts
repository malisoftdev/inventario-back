import Proveedor, { IProveedor } from "../../../models/almacen/proveedor"
import { Request, Response } from "express"
export const crear= async(req:Request,res:Response)=>{
    const {nit,nombre,representante,telefono,direccion}=req.body;
    let proveedorNuevo:IProveedor=new Proveedor({nit,nombre,representante, telefono,direccion});
    try {
        const proveedorCreado:IProveedor =await proveedorNuevo.save();
        res.status(200).json(proveedorCreado);    
    } catch (error) {
        res.status(404).json({message:"Error Creando el Proveedor"});
    }    

}