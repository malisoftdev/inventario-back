import { Request, Response } from "express"
import Usuarios, { IUsuario } from '../../models/usuario'

export const listar = async (req: Request, res: Response) => {
    //for get a list with search parameters we'll use a GET query to provide all seach query to return a result
    let { usuario } = req.query;

    const usuarioParam:string=usuario?usuario.toString():"";


    let usuariosResult: IUsuario[] = await Usuarios.find({
        $or: [
            {
                'usuario': new RegExp(usuarioParam, 'i')
            }
        ],
        activo: true
    });
    res.status(200).json(usuariosResult);
}