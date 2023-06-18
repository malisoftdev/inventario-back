import { IItems } from "../../../models/almacen/items";
import { ILote } from "../../../models/almacen/lote";

export interface IItemsTransferencia{
    lote:ILote,
    //lotes:Array<ILote>,
    lotesSelected:Array<ILotesSelected>,
    items:IItems,
    cantidadTransferir:number,
}

export interface ILotesSelected{
    lote:ILote,
    items:IItems,
    cantidadTransferir:number,
}

export class ItemsTransferencia{
    
}