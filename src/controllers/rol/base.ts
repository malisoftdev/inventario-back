import { Request, Response } from "express";
import Rol, { IRol } from "../../models/rol"

export const getBase = async (req: Request, res: Response) => {
    const rolResult: IRol | null = await Rol.findOne({        
        nombre:"RolBase"
    })
        .populate([{
            path: "menus._id",
            model: "menu",
        }, {
            path: "menus.submenus._id",
            model: "submenu"
        }])
        .exec();
    
    console.log(rolResult)
    rolResult ? res.status(200).json(rolResult) : res.status(404).json({ message: "Rol base no exite en la base de datos." });
}