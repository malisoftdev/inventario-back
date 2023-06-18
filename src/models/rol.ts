import { model, Document, Schema, Types } from "mongoose"
import { IMenu } from "./menu";
export interface IRol extends Document {
    nombre: string,
    descripcion: string,
    usuario: Types.ObjectId,
    activo?: boolean
    menus: IMenu[]
}

const rolSchema = new Schema({
    nombre: { type: String, required: true, maxlength: 50 },
    descripcion: { type: String, maxlength: 100 },
    //usuario: { type: Types.ObjectId, ref: "usuario", required: true },
    activo: { type: Boolean, default: true },
    menus: [
        {
            _id: {
                type: Types.ObjectId,
                ref: "menu",
                required: true
            },
            submenus: [
                {
                    _id: {
                        type: Types.ObjectId,
                        ref: "submenu",
                        required: true
                    }
                }]
        }
    ]
}, {
    timestamps: true
})

export default model<IRol>("rol", rolSchema);