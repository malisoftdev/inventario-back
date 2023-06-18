import { Request,Response } from "express"
import Usuario,{IUsuario} from "../../models/usuario"
export const actualizar= async(req: Request, res: Response)=>{
    let {_id,usuario,password}=req.body;
    let usuarioOld:IUsuario | null= await Usuario.findOne({_id});
    if(usuarioOld){
        if(usuarioOld.password===password!){
            usuarioOld.password=await usuarioOld.encriptarPassword(password);
        }
        usuarioOld.usuario=usuario;
        let usuarioUpdated:IUsuario=await usuarioOld.update(usuarioOld);
        res.status(200).json(usuarioUpdated);
    }else{
        res.status(404).json({message:"error to get user to update"})
    }
}