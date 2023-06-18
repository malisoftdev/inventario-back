import { Schema, model, Document, Types } from 'mongoose'
import { IAlmacen } from './almacen';
//import { IDominio } from '../dominio';

export interface IMovimiento extends Document {
    fecha:Date,
    tipoMov:string,
    glosa:string,
    costoTotal?:number,
    auditoria?:number,
    activo?:boolean,
    desde:IAlmacen,
    hasta:IAlmacen,
    //dominio:IDominio,
}

const movimientoSchema = new Schema(
    {
        fecha: {
            type: Date,
            required:true,
            maxlength:150
        },
        tipoMov:{
            type: String,
            required:true,
            enum:["ABASTECIMIENTO","TRANSPASO","VENTA","DEVOLUCION"]
        },
        glosa:{
            type: String,
            maxlength:200
        },
        costoTotal:{
            type: Number,
            default:0
        },
        auditoria:{
            type:Number,
            default:0
        },
        activo:{
            type:Boolean,
            default:true
        },
        desde:{
            type:Types.ObjectId,
            ref:"almacen",
        },
        hasta:{
            type:Types.ObjectId,
            ref:"almacen",
            required:true,
        },
        /* dominio:{
            type:Types.ObjectId,
            ref:"dominio",
            required:true
        } */
    },
    {
        timestamps: true
    }
)

export default model<IMovimiento>("movimiento", movimientoSchema);

