import Submenu, { ISubmenu } from "../../models/submenu"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let submenu: ISubmenu = new Submenu(({ _id, active: false }));
    try {
        let menuEliminado = await submenu.update(submenu);
        res.status(200).json(menuEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Submenu." })
    }



}