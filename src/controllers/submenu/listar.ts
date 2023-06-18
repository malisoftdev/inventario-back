import { Request, Response } from "express";
import Submenu, { ISubmenu } from "../../models/submenu";

export const listar = async (req: Request, res: Response) => {
    let { nombre, url } = req.body;
    const submenuResult: ISubmenu[] = await Submenu.find({
        $or: [
            {
                nombre: new RegExp(nombre, 'i')
            },
            {
                url: new RegExp(url, 'i')
            },
        ],
        activo:true
    });
    res.status(200).json(submenuResult);
}