import { Request, Response } from "express"
import Menu,{IMenu} from "../../models/menu"
export const crear= async(req:Request,res:Response)=>{
    const {nombre,icono}=req.body;
    let menuNuevo:IMenu=new Menu({nombre,icono})
    /* const {nombre,url,icono,submenus}=req.body;
    let menuNuevo=new Menu({nombre,url,icono,submenus}); */

    try {
        /* const menuCreado =await (await menuNuevo.save())
        .populate({
            path:"submenus._id",
            model:"submenu"
        }).execPopulate(); */
        const menuCreado:IMenu =await menuNuevo.save();
        res.status(200).json(menuCreado);    
    } catch (error) {
        res.status(404).json({message:"Error Creando el Menu"});
    }    

}