import Item, { IItems } from "../../../models/almacen/items"
import { Request, Response } from "express"
export const crear= async(req:Request,res:Response)=>{
    let { nombre,categoria, peresedero } = req.body;
    let itemNuevo:IItems=new Item({ nombre, categoria, peresedero});

    try {
        let itemCreado:IItems =await (await itemNuevo.save()).populate("categoria").execPopulate();
        res.status(200).json(itemCreado);    
    } catch (error) {
        res.status(500).json({message:"Error Creando el Item"});
        console.log(error)
    }    

}