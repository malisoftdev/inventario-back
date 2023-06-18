import { Schema, model, Document } from 'mongoose'

export interface ICategoria extends Document {
    nombre: string,
    descripcion: string,
    auditoria?:number,
    estado?:Boolean,
    activo?: boolean,
}

const categoriaSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            maxlength: 100,
        },
        descripcion: {
            type: String,
            maxlength: 200
        },
        estado:{
            type: Boolean,
            default: true
        },
        auditoria:{
            type: Number,
            default:0,            
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

export default model<ICategoria>("categoria", categoriaSchema);

