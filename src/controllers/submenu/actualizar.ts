import Submenu, { ISubmenu } from "../../models/submenu"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    let { _id, nombre, url } = req.body;

    try {
        let submenuOld: ISubmenu | null = await Submenu.findOne({ _id });

        if (submenuOld) {
            submenuOld.nombre = nombre;
            submenuOld.url = url;
            let submenuUpdated = await submenuOld.update(submenuOld);
            res.status(200).json(submenuUpdated);
        } else {
            res.status(404).json({ message: "Submenu no se encontró." })
        }

    } catch (error) {
        res.status(500).json({ message: "No se pudo gravar el submenu" });
    }
}