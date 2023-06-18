import { Request, Response } from "express"
import Submenu,{ISubmenu} from "../../models/submenu"
export const crear= async(req:Request,res:Response)=>{
    const {nombre,url,icono}=req.body;
    let submenuNuevo=new Submenu({nombre,url});

    try {
        const submenuCreado:ISubmenu =await submenuNuevo.save();
        res.status(200).json(submenuCreado);    
    } catch (error) {
        res.status(404).json({message:"Error Creando el Submenu"});
    }    

}