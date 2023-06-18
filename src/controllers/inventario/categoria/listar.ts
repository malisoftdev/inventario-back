import { Request, Response } from "express";
import Categoria, { ICategoria } from "../../../models/almacen/categoria"

export const listar = async (req: Request, res: Response) => {
    let { estado } = req.body;
    let categoriaResult: ICategoria[];
    if (estado) {
        let { nombre, descripcion } = req.body;
        categoriaResult = await Categoria.find({
            $or: [
                {
                    nombre: new RegExp(nombre, 'i')
                },
                {
                    descripcion: new RegExp(descripcion, 'i')
                },
            ],
            activo: true,
            estado: true,
        });
        res.status(200).json(categoriaResult);
    } else {
        let { nombre, descripcion } = req.body;
        categoriaResult = await Categoria.find({
            $or: [
                {
                    nombre: new RegExp(nombre, 'i')
                },
                {
                    descripcion: new RegExp(descripcion, 'i')
                },
            ],
            activo: true
        });
        res.status(200).json(categoriaResult);
    }

}