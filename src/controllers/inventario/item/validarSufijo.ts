
import { Request, Response, text } from "express"
import { ValidateSufijo } from "./classes/validateSufijoClass";

export const sufijo = async (req: Request, res: Response) => {
    let { sufijo } = req.body;
    
    try {
        let validation=new ValidateSufijo(sufijo);
        let validationResult=await validation.validate();
        return validationResult ? res.status(200).json({ message: "Válido" }):res.status(500).json({ message: "No Válido" });
    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el Producto" });
    }
}