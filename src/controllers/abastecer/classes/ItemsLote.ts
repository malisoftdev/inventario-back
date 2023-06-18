import { IItems } from "../../../models/almacen/items";
import { ILote } from "../../../models/almacen/lote";

export interface IItemsLote{
    lote?:Array<ILote>,
    items:IItems,
    cantidad:number,
}
export class ItemsLote{
    
}