import { Request, Response } from "express";
import Usuario, { IUsuario } from "../models/usuario"

import jwt from "jsonwebtoken";

export const loginAuth = async (req: Request, res: Response) => {
    let { usuario, password } = req.body;

    //Validate if user exist
    const usuarioResult: IUsuario | null = await Usuario.findOne({ usuario })
        .populate({
            path: "rol",
            model: "rol",
            populate: {
                path: "menus._id",
                model: "menu",
                populate: {
                    path: "submenus._id",
                    model: "submenu"
                }
            }
        });
    if (!usuarioResult) return res.status(404).json({ message: "Usuario no encontrado." })

    //validate if password match
    const validateResult: boolean = await usuarioResult.validarPassword(password);
    if (!validateResult) return res.status(404).json({ message: "Contraseña Invalido." })

    //here we create token variable
    const token: string = jwt.sign({ _id: usuarioResult._id }, process.env.TOKEN_SECRET || "token_test", { expiresIn: 60 * 60 * 24 })
    //res.status(200).json({"authToken":token,usuarioResult});
    res.status(200).json({ "authToken": token, usuarioResult });
}