import { Schema, model, Document, Types } from 'mongoose'

const llavesSchema = new Schema(
    {
        AUTORIZACION: {
            type: String,
            required:true,
            maxlength:150
        },
        FACTURA:{
            type: String,
            required:true,
            maxlength:150
        },
        NIT_CI:{
            type: String,
            required:true,
            maxlength:150
        },
        FECHA: {     
            type: String,
            required:true,
            maxlength:150
        },
        MONTO:{
            type: String,
            required:true,
            maxlength:150
        },
        LLAVE:{
            type: String,
            required:true,
            maxlength:150
        },
        VERHOEFF:{
            type: String,
            required:true,
            maxlength:150
        },
        CADENA:{
            type: String,
            required:true,
            maxlength:150
        },
        SUMATORIA:{
            type: String,
            required:true,
            maxlength:150
        },
        BASE64:{
            type: String,
            required:true,
            maxlength:150
        },
        CONTROL:{
            type: String,
            required:true,
            maxlength:150
        },
        
    }
)

export default model("llaves", llavesSchema);

