import { Request,Response } from "express"
import Usuario,{ IUsuario } from "../../models/usuario";

export const eliminar= async(req: Request, res: Response)=>{
    let {_id}=req.body;
    //here we never will use delete a registry only will be edited 'activo' field value
    let usuario:IUsuario=new Usuario({_id,activo:false});
    let usuarioUpdated=await usuario.update(usuario);
    res.status(200).json(usuarioUpdated);
}