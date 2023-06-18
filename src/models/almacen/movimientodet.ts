import { Schema, model, Document, Types } from 'mongoose'
import { ILote } from './lote';
import { IMovimiento } from "./movimiento";
import { IItems } from "./items";

export interface IMovimientoDet extends Document {
    costo:number,
    cantidadAnterior:number,
    cantidad:number,
    cantidadActual:number,
    lote:ILote,
    movimiento:IMovimiento,
    items:IItems,
    estado?:number,
    auditoria?:number,
    activo?:boolean
}

const movimientoDetSchema = new Schema(
    {
        lote:{
            type:Types.ObjectId,
            ref:"lote",
            required:true
        },
        movimiento:{
            type:Types.ObjectId,
            ref:"movimiento",
            required:true
        },
        items:{
            type:Types.ObjectId,
            ref:"items",
            required:true
        },
        costo:{
            type: Number,
            required:true,
        },
        cantidadAnterior:{
            type: Number,
            required:true,
        },
        cantidad:{
            type: Number,
            required:true,
        },
        cantidadActual:{
            type: Number,
            default:0
        },
    },
    {
        timestamps: true
    }
)

export default model<IMovimientoDet>("movimientodet", movimientoDetSchema);