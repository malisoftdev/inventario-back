import { Schema, model, Document, Types } from 'mongoose'

export interface ISubmenu extends Document{
    nombre: string,
    url: string,
    activo?: boolean
}

const submenuSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            maxlength: 50,
        },
        url: {
            type: String,
            required: true,
            maxlength: 100
        },
        activo:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps: true
    }
)

export default model<ISubmenu>("submenu",submenuSchema);

