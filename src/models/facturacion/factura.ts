import { model, Document, Schema, Types } from "mongoose"
import { IDosificacion } from "./dosificacion";
import { IItems } from "../almacen/items";
export interface IFactura extends Document {
    dosificacion: IDosificacion,

    idtabla: String,
    tabla: String,

    fecha: String,
    fechaAnulado: String,

    nroFactura: number,
    lugarFecha: String,
    nit: String,
    razon: String,
    literal: string,
    total: string,

    descuento: string,
    saldo: string,

    fechaLimite: String,
    codControl: string,
    leyenda: string,

    observaciones: string,
    impresiones: number,
    estado: number,

    prueba?: boolean,
    activo?: boolean,
    detalle: IItems
}
const dosificacionSchema = new Schema(
    {
        dosificacion: {
            type: Types.ObjectId,
            ref: "dosificacion",
            required: true,
        },
        idtabla: {
            type: Number,
            required: true,
        },
        tabla: {
            type: String,
            required: true,
            maxlength: 250
        },
        fecha: {
            type: Date,
            required: true
        },
        fechaAnulado: {
            type: Date,
        },

        nroFactura: {
            type: Number,
            required: true
        },
        lugarFecha: {
            type: String,
            required: true
        },
        nit: {
            type: String,
            required: true,
            maxlength: 250
        },
        razon: {
            type: String,
            required: true,
            maxlength: 200
        },
        literal: {
            type: String,
            required: true,
            maxlength: 500
        },
        total: {
            type: Number,
            required: true,
            default: 0
        },
        descuento: {
            type: Number,
            default: 0
        },
        saldo: {
            type: Number,
            default: 0
        },
        fechaLimite: {
            type: Date,
            required: true
        },
        codControl: {
            type: String,
            required: true,
            maxlength: 50
        },
        leyenda: {
            type: String,
            required: true,
            maxlength: 1000
        },
        observaciones: {
            type: String,
            maxlength: 1000
        },
        impresiones: {
            type: Number,
            default: 1
        },
        estado: {
            type: Number,
            required: true
        },
        prueba: {
            type: Boolean,
            default: false
        },
        activo: {
            type: Boolean,
            default: true
        },
        detalle: [
            {
                _id: {
                    type: Types.ObjectId,
                    ref: "items"
                },
                codigo: {
                    type: String,
                    maxlength: 50
                },
                detalle: {
                    type: String,
                    maxlength: 1000
                },
                cantidad: {
                    type: Number,
                    required: true,
                },
                precio: {
                    type: Number,
                    required: true,
                },
                subtotal: {
                    type: Number,
                    required: true,
                },
                estado: {
                    type: Number,
                    default: 1
                },
            }
        ]
    },
    {
        timestamps: true
    }
)

export default model<IFactura>("factura", dosificacionSchema);