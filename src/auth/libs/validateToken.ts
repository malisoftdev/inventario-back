import { Request } from "express";
import { IPayload } from "../interfaces/payload"
import jwt from "jsonwebtoken"

export const validateToken = (req: Request): IPayload | null => {
    const token = req.header("auth-token");
    if (!token) return null
    try {
        const payload: IPayload = jwt.verify(token, process.env.TOKEN_SECRET || "token_test") as IPayload;
        req.usuarioId = payload._id;
        return payload
    } catch (error) {
        return null
    }
}