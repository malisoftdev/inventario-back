import { Request, Response, NextFunction } from "express";
import { validateToken } from "./libs/validateToken";
import { IPayload } from "./interfaces/payload";
import Usuario, { IUsuario } from "../models/usuario";
import { IRol } from "src/models/rol";


export const usuarioAuth = async (req: Request, res: Response, next: NextFunction) => {
    const payload: IPayload | null = validateToken(req);

    if (!payload) return res.status(404).json({ message: "Acceso Denegado." });

    let usuarioResult: IUsuario | null = await Usuario.findOne({ _id: payload._id }).populate("rol").exec()

    console.log(usuarioResult);

    let rol: IRol | null = usuarioResult ? usuarioResult.rol as unknown as IRol : null;

    if (!rol) return res.status(404).json({ message: "Usuario no tiene rol." });

    if (rol.nombre === "Usuarios") { next() } else return res.status(404).json({ message: "No tiene permisos para usuarios" });

}