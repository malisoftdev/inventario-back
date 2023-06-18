import Sucursal, { ISucursal } from "../../models/sucursal"
import { Request, Response } from "express"

export const actualizar = async (req: Request, res: Response) => {
    const {
        _id,
        miempresa,
        nombre,
        direccion,
        zona,
        idcuidad,
        telefono,
        activad,
        idEncargadoPer,
        web,
        latlng,
        casaMatriz,
        estado,
        auditoria
    } = req.body;

    try {
        let sucursalOld: ISucursal | null = await Sucursal.findOne({ _id });
        if (!sucursalOld) return res.status(404).json({ message: "No se encontró Sucursal" });
        sucursalOld.nombre = nombre;
        sucursalOld.miempresa = miempresa
        sucursalOld.nombre = nombre
        sucursalOld.direccion = direccion
        sucursalOld.zona = zona
        sucursalOld.idcuidad = idcuidad
        sucursalOld.telefono = telefono
        sucursalOld.activad = activad
        sucursalOld.idEncargadoPer = idEncargadoPer
        sucursalOld.web = web
        sucursalOld.latlng = latlng
        sucursalOld.casaMatriz = casaMatriz
        sucursalOld.estado = estado
        sucursalOld.auditoria = auditoria

        await sucursalOld.update(sucursalOld);
        sucursalOld = await Sucursal.findOne({ _id });
        res.status(200).json(sucursalOld);
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar la Sucursal" });
    }
}