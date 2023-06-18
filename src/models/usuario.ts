import { Schema, model, Document, Types } from 'mongoose'
import bcrypt from "bcryptjs"
import { IRol } from './rol';
import { ISucursal } from './sucursal';

export interface IUsuario extends Document {
  usuario: string,
  password: string,
  rol?: IRol,
  sucursal: ISucursal,
  encriptarPassword(password: string): Promise<string>,
  validarPassword(password: string): Promise<boolean>
}

const usuarioModel = new Schema({
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  activo: { type: Boolean, default: true },
  rol: { type: Types.ObjectId, ref: "rol" },
  sucursal: {
    type: Types.ObjectId, ref: "sucursal",
    required: true
  }
  /* persona:{type:Types.ObjectId,ref:"persona",required:true} */
}, { timestamps: true })

usuarioModel.methods.encriptarPassword = async (passwod: string): Promise<string> => {
  const saltos = await bcrypt.genSalt(10);
  return bcrypt.hash(passwod, saltos);
}

usuarioModel.methods.validarPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

export default model<IUsuario>('usuario', usuarioModel);