import { Schema, model, Document, Types } from 'mongoose'
import submenu, { ISubmenu } from './submenu';

export interface IMenu extends Document {
    nombre: string,
    icono: string,
    activo?: boolean
    submenus?: ISubmenu[],
}

const menuSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            maxlength: 50,
        },
        icono: {
            type: String,
            maxlength: 50
        },
        activo: {
            type: Boolean,
            default: true
        },
        /* submenus: [{
            _id: { 
                type: Types.ObjectId, 
                ref:"submenu",
                required: true 
            }
        }] */
    },
    {
        timestamps: true
    }
)

export default model<IMenu>("menu", menuSchema);

