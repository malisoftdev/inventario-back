import { Document } from "mongoose";
import { IAlmacen } from "src/models/almacen/almacen";
import { IAlmacenItem } from "src/models/almacen/almacenItem";
import { ILote } from "src/models/almacen/lote";
import { Procedure } from "../abstracts/Procedure";

export class Transferir extends Procedure{
   
    constructor(almacenDesde:IAlmacen,almacenHasta:IAlmacen,lotes:Array<ILote>){
        super();
    }
    validate(): boolean {
        throw new Error("Method not implemented.");
    }
    getMessage(): string | null {
        throw new Error("Method not implemented.");
    }
    exec(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getDocument(): Document | null {
        throw new Error("Method not implemented.");
    }
}