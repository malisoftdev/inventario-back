import { Request, Response, NextFunction } from "express";
import { validateToken } from "./libs/validateToken";
import { validateRol } from "./libs/validateRol";
import { IPayload } from "./interfaces/payload";

let permisosRol = "/rol"

export const rolAuth = async (req: Request, res: Response, next: NextFunction) => {
    const payload: IPayload | null = validateToken(req);
    if (!payload) return res.status(403).json({ message: "Acceso Denegado." });
    let validation: Boolean = await validateRol(payload, permisosRol);
    validation ? next() : res.status(403).json({ message: "No puedes realizar esta operación" })
}