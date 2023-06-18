import { Schema, model, Document, Types } from 'mongoose'

export interface IPrecio extends Document {
    nombre: string,
    descripcion: string,
    auditoria?: string,
    activo?: boolean
}

const precioSchema = new Schema(
    {
        nombre: {
            type: String,
            maxlength:100,
            required:true
        },
        descripcion: {
            type: String,
            maxlength:200,
        },
        auditoria: {
            type: String,
            maxlength:50
        },
        activo:{
            type: Boolean,
            default:true,
        },
    },
    {
        timestamps: true
    }
)

export default model<IPrecio>("precio", precioSchema);

