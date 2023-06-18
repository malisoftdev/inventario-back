import { Schema, model, Document, Types } from 'mongoose'
import {ISucursal} from "../sucursal"

export interface IAlmacen extends Document {
    nombre: string,
    detalle: string,
    central: boolean,
    visible: boolean,
    auditoria: number,
    activo?: boolean
    sucursal: ISucursal,
}

const almacenSchema = new Schema(
    {
        sucursal: {     
            type: Types.ObjectId, 
            ref:"sucursal",
            required: true 
        },
        nombre: {
            type: String,
            required: true,
            maxlength: 100,
        },
        detalle: {
            type: String,
            maxlength: 200
        },
        central: {
            type: Boolean,
            default: false,
        },
        visible: {
            type: Boolean,
            default: false,
        },
        auditoria: {
            type: Number,
            default: 0,
        },
        activo: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)

export default model<IAlmacen>("almacen", almacenSchema);

