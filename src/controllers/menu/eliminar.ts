import Menu, { IMenu } from "../../models/menu"
import { Request, Response } from "express"

export const eliminar = async (req: Request, res: Response) => {
    let { _id } = req.body;
    let menu: IMenu = new Menu(({ _id, active: false }));
    try {
        let menuEliminado = await menu.update(menu);
        res.status(200).json(menuEliminado);
    } catch (error) {
        res.status(500).json({ message: "No se pudo Eliminar Menu." })
    }



}