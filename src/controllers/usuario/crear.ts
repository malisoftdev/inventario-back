import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import Usuario, { IUsuario } from "../../models/usuario";

export const crear = async (req: Request, res: Response) => {
    //Destructuring body request
    let {
        usuario,
        password,
        rol,
        sucursal,
    } = req.body;

    let usuarioNew: IUsuario = new Usuario({ usuario, password, rol,sucursal });
    try {
        usuarioNew.password = await usuarioNew.encriptarPassword(usuarioNew.password);
        //save the user new
        let userSaved = await usuarioNew.save();
        res.status(200).json(userSaved);
    } catch (error) {
        res.status(404).json({ message: "Error guardando usuario" });
    }



}