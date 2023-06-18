import Menu, { IMenu } from "../../models/menu"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    let { _id, nombre, icono } = req.body;
    /* let { _id, nombre, url, icono,submenus } = req.body; */

    try {
        let menuOld: IMenu | null = await Menu.findOne({ _id });

        if (menuOld) {
            menuOld.nombre = nombre;
            menuOld.icono = icono;
            /* menuOld.submenus=submenus; */
            await menuOld.update(menuOld);

            let menuUpdated=await Menu.findOne({ _id });
            res.status(200).json(menuUpdated);
        } else {
            res.status(404).json({ message: "Menu no se encontró." })
        }

    } catch (error) {
        res.status(500).json({ message: "No se pudo gravar el menu" });
    }
}