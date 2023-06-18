import AlmacenItem, { IAlmacenItem } from "../../models/almacen/almacenItem";
import Items, { IItems } from "../../models/almacen/items";
import { Request, Response } from "express";
import { asyncForEach } from "../../utils/asyncArray"
import MovimientoDet, { IMovimientoDet } from "../../models/almacen/movimientodet";
//import { IAlmacen } from "src/models/almacen/almacen";
import { AlmacenItemClass, IItemsCantidad } from "./classes/AlmacenItemClass";

export const listar = async (req: Request, res: Response) => {
    let { almacen, items } = req.body;

    try {
        if (almacen) {
            let AlmItem=new AlmacenItemClass(almacen);
            if (items) {
                let almacenItemResult:Array<IAlmacenItem> = await AlmacenItem.find({ almacen, items: items._id, activo: true })
                    .populate("lote").populate("items").exec();
                res.status(200).json(almacenItemResult);
            } else {
                console.log("cargando")
                let almacenItemCantidad:IItemsCantidad[]=await AlmItem.getByAlmacenItemsArrayCantidad();
                /* let movimientosItems: Array<IMovimientoDet> = [];
                let itemsResult: Array<IItems> = await Items.find({ activo: true });
                await asyncForEach(itemsResult, async (items: IItems) => {
                    const MovimientoItemLast: IMovimientoDet | null = await MovimientoDet.findOne({ items: items._id }, {},).sort({ 'createdAt': -1 }).populate("items").populate("lote").populate("movimiento").exec();
                    if (MovimientoItemLast) {
                        movimientosItems.push(MovimientoItemLast);
                    }
                }); */
                //res.status(200).json(movimientosItems);
                res.status(200).json(almacenItemCantidad);
            }
        } else {
            res.status(400).json({ message: "No hay almacen seleccionado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error buscando los Productos." })
    }
}