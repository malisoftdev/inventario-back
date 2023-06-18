import { Schema, model, Document } from 'mongoose'

export interface IProveedor extends Document {
    nit: string,
    nombre: string,
    representante: string,
    telefono: string,
    direccion: string,
    auditoria?: number,
    activo?: boolean,
}

const proveedorSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            maxlength: 100,
        },
        representante: {
            type: String,
            maxlength: 100,
        },
        telefono: {
            type: String,
            maxlength: 20
        },
        nit: {
            type: String,
            maxlength: 200,
            default: "N/N"
        },
        direccion: {
            type: String,
            maxlength: 300,
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

export default model<IProveedor>("proveedor", proveedorSchema);

