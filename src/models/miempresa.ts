import { model, Document, Schema, Types } from "mongoose"
export interface IMiempresa extends Document {
    nombre: string,
    nit: string,
    colorOscuro: string,
    colorClaro: string,
    activo?: boolean
}
const miempresaSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            maxlength: 150,
        },
        nit: {
            type: String,
            maxlength: 50
        },
        colorOscuro: {
            type: String,
            maxlength: 10
        },
        colorClaro: {
            type: String,
            maxlength: 10
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

export default model<IMiempresa>("miempresa", miempresaSchema);