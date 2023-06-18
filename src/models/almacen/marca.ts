import { Schema, model, Document, Types } from 'mongoose'

export interface IMarca extends Document {
    nombre:string,
    descripcion:string,
    auditoria?:number,
    activo?: boolean
}

const marcaSchema = new Schema(
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
    },
    {
        timestamps: true
    }
)

export default model<IMarca>("marca", marcaSchema);

