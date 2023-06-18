import { Request, Response } from "express"
import Rol, { IRol } from "../../models/rol"
export const crear = async (req: Request, res: Response) => {
    const { nombre, descripcion, menus } = req.body;

    console.log({nombre})
    let rolNuevo = new Rol({ nombre, descripcion, menus });
    try {
        const rolCreado = await rolNuevo.save();

        const rolReturn = await Rol.findOne({ _id: rolCreado })
            .populate({
                path: "menus._id",
                model: "menu",
                
            })
            .populate({
                path: "menus.submenus._id",
                model: "submenu"
            })
            .exec();
        res.status(200).json(rolReturn);
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Error Creando el Rol" });
    }

}