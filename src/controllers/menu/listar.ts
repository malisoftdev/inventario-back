import { Request, Response } from "express";
import Menu, { IMenu } from "../../models/menu";

export const listar = async (req: Request, res: Response) => {
    let { nombre, descripcion, icono } = req.body;
    const menuResult: IMenu[] = await Menu.find({
        $or: [
            {
                nombre: new RegExp(nombre, 'i')
            },
            {
                icono: new RegExp(icono, 'i')
            }
        ],
        activo:true
    });
    res.status(200).json(menuResult);
}