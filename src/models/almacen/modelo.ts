import { Schema, model, Document, Types } from 'mongoose'
import {IMarca} from "./marca"
import {IDominio} from "../dominio"

export interface IModelo extends Document {
    marca:IMarca,
    nombre:string,
    descripcion:string,
    auditoria?:number,
    activo?: boolean,
}

const modeloSchema = new Schema(
    {
        nombre: {
            type: String,
            required:true,
            maxlength:150
        },
        descripcion:{
            type: String,
            maxlength:200,
        },
        auditoria:{
            type: Number,
            default:0  
        },
        activo: {     
            type: Boolean, 
            default:true
        },
        marca:{
            type: Types.ObjectId,
            ref:"marca",
            required:true
        },
        
    },
    {
        timestamps: true
    }
)

export default model<IModelo>("modelo", modeloSchema);

