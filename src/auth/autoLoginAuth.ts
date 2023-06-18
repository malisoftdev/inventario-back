import { Request, Response, NextFunction } from "express";
import { validateToken } from "./libs/validateToken";
import { IPayload } from "./interfaces/payload";
import Usuario, { IUsuario } from "../models/usuario";

export const autoLoginAuth = async (req: Request, res: Response, next: NextFunction) => {
    const payload: IPayload | null = validateToken(req);

    if (!payload) return res.status(403).json({ message: "Acceso Denegado." });

    let usuarioResult: IUsuario | null = await Usuario.findOne({ _id: payload._id })
        .populate({
            path: "rol",
            model: "rol",
            populate: [{
                path: "menus._id",
                model: "menu",
            }, {
                path: "menus.submenus._id",
                model: "submenu"
            }]
        }).populate("sucursal")
        .exec();
    return !usuarioResult ? res.status(404).json({ message: "Usuario no existe" }) : res.status(200).json(usuarioResult);

}