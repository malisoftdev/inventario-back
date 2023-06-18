import { Response,Request } from "express";
import Rol,{IRol} from "../../models/rol"

export const eliminar= async(req:Request,res:Response)=>{
    let {_id}=req.body;
    let rol:IRol=new Rol({_id,activo:false});
    let rolUpdated=await rol.update(rol);
    console.log(rolUpdated)
    res.status(200).json(rolUpdated);
}