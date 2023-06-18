import {IProveedor} from './proveedor'
import { Schema, model, Document, Types } from 'mongoose'

/* export interface ICodLote{
    year:string,
    sequense:string,
    nextValue:number,
} */

export interface ILote extends Document {
    fecha:Date,
    fechaVencimiento?: Date,
    nroLote: string,
    //codlote:ICodLote,
    tipo_documento: string,
    documento: string,
    estado: boolean,
    auditoria?: number,
    activo?: boolean,
    proveedor:IProveedor,
}

const loteSchema = new Schema(
    {
        fecha: {
            type: Date,
            required: true,
        },
        fechaVencimiento: {
            type: Date,
        },
        nroLote: {
            type: String,
            maxlength: 100,
            required:true,
        },
        tipo_documento: {
            type: String,
            enum: ["FACTURA","RECIBO"], default: "FACTURA"
        },
        documento: {
            type: String,
            maxlength: 100
        },
        estado: {
            type: Boolean,
            default: true,
        },
        auditoria: {
            type: Number,
            default: 0,
        },
        activo: {
            type: Boolean,
            default: true
        },
        proveedor:{
            type:Types.ObjectId,
            ref:"proveedor",
            required:true
        }
    },
    {
        timestamps: true
    }
)

export default model<ILote>("lote", loteSchema);

