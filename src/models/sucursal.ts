import { Schema, model, Document, Types } from 'mongoose'
import { IMiempresa } from './miempresa';
interface ILatlng{
    lat:string,
    lng:string
}

export interface ISucursal extends Document {
    miempresa:IMiempresa,
    nombre:string,
    direccion:string,
    zona:string,
    idcuidad:number,
    telefono:string,
    activad:string,
    idEncargadoPer:string,
    nroVenta:number,
    nroNota:number,
    nroGasto:number,
    web:boolean,
    latlng: ILatlng,
    nroLote:number,
    nroCotizacion:number,
    nroCatalogo:number,
    casaMatriz:boolean,
    estado:boolean,
    auditoria:number,
    activo?:boolean
}

const sucursalSchema = new Schema(
    {
        miempresa: {
            type: Types.ObjectId,
            ref:"miempresa",
            required:true,
        },
        nombre:{
            type: String,
            required:true,
            maxlength:200
        },
        direccion:{
            type: String,
            required:true,
            maxlength:200
        },
        zona:{
            type: String,
            maxlength:200
        },
        idCuidad:{
            type:Number,
            default:0
        },
        telefono:{
            type:String,
            maxlength:100
        },
        actividad:{
            type:String,
            maxlength:100
        },
        idEncargadoPer:{
            type:Number,
        },
        nroVenta:{
            type:Number,
        },
        nroGasto:{
            type:Number,
        },
        nroRemesa:{
            type:Number,
        },
        web:{
            type:Boolean,
            default:false,
        },
        latlng:{
            lat:{
                type:String,
            },
            lng:{
                type:String,
            }
        },
        nroLote:{
            type:Number,
        },
        nroCotizacion:{
            type:Number,
        },
        nroCatalogo:{
            type:Number,
        },
        casaMatriz:{
            type:Boolean,
            default:false
        },
        estado:{
            type:Boolean,
            default:true,
        },
        auditoria:{
            types:Number,
            default:0,
        },
        activo:{
            type:Boolean,
            default:true
        },
        
    },
    {
        timestamps: true
    }
)

export default model<ISucursal>("sucursal", sucursalSchema);

