import { model, Document, Schema, Types } from "mongoose"
import { ISucursal } from "./../sucursal";
export interface IDosificacion extends Document {
    sucursal: ISucursal,
    autorizacion: number,
    llave: String,
    fechaLimite: String,
    inicial: number,
    nroFactura: number,
    tramite: string,
    leyenda: string,
    tipo: string,
    estado: number,
    activo?: boolean
}
const dosificacionSchema = new Schema(
    {
        sucursal: {
            type: Types.ObjectId,
            ref: "sucursal",
            required: true,
        },
        autorizacion: {
            type: Number,
            required: true,
            maxlength: 150,
        },
        llave: {
            type: String,
            required: true,
            maxlength: 250
        },
        fechaLimite: {
            type: Date,
            required: true
        },
        inicial: {
            type: Number,
            required: true
        },
        nroFactura: {
            type: Number,
            required: true
        },
        tramite: {
            type: String,
            required: true,
            maxlength: 250
        },
        leyenda: {
            type: String,
            required: true,
            maxlength: 1000
        },
        tipo: {
            type: String,
            required: true,
        },
        estado: {
            type: Number,
            required: true
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

export default model<IDosificacion>("dosificacion", dosificacionSchema);