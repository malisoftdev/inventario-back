import { model, Document, Schema, Types } from "mongoose"
import { IDominio } from "./dominio";

export interface IPersona extends Document {
    nacionalidad: string,
    tipoDoc: string,
    nroDoc: string,
    departamento: IDominio,
    nombre: string,
    paterno: string,
    materno: string,
    fechaNacimiento: string,
    email: string,
    celular: string,
    sexo: IDominio,
    estadoCivil: IDominio,
    tipoPersona: string,
    activo?: boolean
}
const personaSchema = new Schema(
    {
        nacionalidad: {
            type: String,
            maxlength: 150,
        },
        tipoDoc: {
            type: String,
            maxlength: 150
        },
        nroDoc: {
            type: String,
            maxlength: 200
        },
        departamento: {
            type: Types.ObjectId,
            ref: "dominio",
        },
        nombre: {
            type: String,
            required: true,
            maxlength: 150
        },
        paterno: {
            type: String,
            maxlength: 150
        },
        materno: {
            type: String,
            maxlength: 150
        },
        fechaNacimiento: {
            type: Date,
        },
        email: {
            type: String,
            maxlength: 150
        },
        celular: {
            type: String,
            maxlength: 150
        },
        sexo: {
            type: Types.ObjectId,
            ref: "dominio",
        },
        estadoCivil: {
            type: Types.ObjectId,
            ref: "dominio",
        },
        tipoPersona: {
            type: String,
            maxlength: 150
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

export default model<IPersona>("personas", personaSchema);