import { model, Document, Schema, Types } from "mongoose"
export interface IDominio extends Document {
    codigo: string,
    short: string,
    nombre: string,
    detalle: string,
    tipo: string,
    activo?: boolean
}
const dominioSchema = new Schema(
    {
        codigo: {
            type: String,
            required: true,
            maxlength: 150,
        },
        short: {
            type: String,
            maxlength: 150
        },
        nombre: {
            type: String,
            maxlength: 200
        },
        detalle: {
            type: String,
            maxlength: 500
        },
        tipo: {
            type: String,
            maxlength: 15
        },
        activo: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export default model<IDominio>("dominio", dominioSchema);