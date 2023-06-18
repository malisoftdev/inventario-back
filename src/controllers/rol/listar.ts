import { Request, Response } from "express";
import Rol,{IRol} from "../../models/rol"

export const listar=async(req:Request,res:Response)=>{
    let {nombre,descripcion}=req.body;

    const rolResult:IRol[]=await Rol.find({
        $or: [
            {
                nombre: new RegExp(nombre, 'i')
            },
            {
                descripcion: new RegExp(descripcion, 'i')
            }
        ],
        activo: true
    })
    .populate({
        path: "menus._id",
        model: "menu",
        
    })
    .populate({
        path: "menus.submenus._id",
        model: "submenu"
    })
    .exec();
    res.status(200).json(rolResult);
}