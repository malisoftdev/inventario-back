import { Schema, model, Document, Types } from 'mongoose'
import { IAlmacen } from './almacen';
import { IItems } from './items';
import { ILote } from './lote';

export interface IAlmacenItem extends Document {
    almacen: IAlmacen,
    items:IItems,
    lote:ILote,
    cantidad: number,
    precio: number,
    
    auditoria?:string,
    activo?: boolean
}

const almacenItemSchema = new Schema(
    {
        cantidad: {
            type: Number,
            default: 0,
        },
        precio: {
            type: Number,
            default: 0,
        },
        auditoria: {
            type: Number,
            default: 0,
        },
        activo:{
            type: Boolean,
            default:true,
        },
        almacen:{
            type: Types.ObjectId,
            required:true,
            ref:"almacen"  
        },
        items: {
            type: Types.ObjectId,
            required:true,
            ref:"items"
        },
        lote: {     
            type: Types.ObjectId, 
            ref:"lote",
            required: true 
        },
    },
    {
        timestamps: true
    }
)

export default model<IAlmacenItem>("almacenItem", almacenItemSchema);

