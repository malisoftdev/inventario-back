import { Request, Response } from "express";
import Rol,{ IRol } from "../../models/rol";

export const actualizar=async(req:Request,res:Response)=>{
    let {_id,nombre,descripcion,menus}=req.body;
    
    let rolOld:IRol | null= await Rol.findOne({_id});
    console.log(_id)
    if(rolOld){
        rolOld.nombre=nombre;
        rolOld.descripcion=descripcion;
        rolOld.menus=menus;
        await rolOld.update(rolOld);
        let rolUpdated:IRol|null=await Rol.findOne({_id})
        .populate({
            path: "menus._id",
            model: "menu",
            
        })
        .populate({
            path: "menus.submenus._id",
            model: "submenu"
        })
        .exec();;
        res.status(200).json(rolUpdated);
    }else{
        res.status(404).json({message:"Rol no encontrado"})
    }
}