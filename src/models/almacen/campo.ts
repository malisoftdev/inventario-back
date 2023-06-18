import { Schema, model, Document, Types } from 'mongoose'
import { ICategoria } from './categoria'
export interface ICampo extends Document {
    nombre: string,
    tipo: string,
    estado:boolean,
    categoria:ICategoria,
    activo?: boolean
}

const campoSchema = new Schema(
    {
        nombre: {
            type: String,
            maxlength:100,
            required:true
        },
        tipo: {
            type: String,
            enum:["TEXTO","NUMERO"],
            default:"TEXTO"
        },
        estado: {
            type: Boolean,
            default: true,
        },
        activo:{
            type: Boolean,
            default:true,
        },
        categoria:{
            type: Types.ObjectId,
            required:true,
            ref:"categoria"  
        },
    },
    {
        timestamps: true
    }
)

export default model<ICampo>("campo", campoSchema);

