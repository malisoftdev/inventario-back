import { Schema, model, Document, Types } from 'mongoose'
import { ICategoria } from "./categoria";
import { IMarca } from './marca';
import { IModelo } from './modelo';
import { IProveedor } from './proveedor';

export interface IItems extends Document {
    sufijo:string,
    codigo: string,
    codBarras: string,
    nombre:string,
    descripcion:string,
    textoCliente:string,
    peresedero:boolean,
    activo?: boolean
    marca:IMarca,
    modelo:IModelo,
    categoria: ICategoria,
    proveedor:IProveedor,
}

const itemsSchema = new Schema(
    {
        sufijo:{
            type:String,
            maxlength:20,
        },
        marca: {
            type: Types.ObjectId,
            ref:"marca",
        },
        modelo: {     
            type: Types.ObjectId, 
            ref:"modelo",
        },
        proveedor:{
            type: Types.ObjectId, 
            ref:"proveedor", 
        },
        categoria:{
            type: Types.ObjectId, 
            ref:"categoria",
            required: true 
        },
        codigo: {
            type: String,
            maxlength: 100,
        },
        codBarras: {
            type: String,
            maxlength: 100
        },
        nombre: {
            type: String,
            required:true,
            maxlength:150
        },
        descripcion:{
            type: String,
            maxlength:200
        },
        textoCliente:{
            type: String,
            maxlength:500,
        },
        peresedero:{
            type: Boolean,
            default:false,
            requiered:true
        },     
        activo:{
            type: Boolean,
            default:true
        }
    },
    {
        timestamps: true
    }
)

export default model<IItems>("items", itemsSchema);