import { Request } from "express";
import { IPayload } from "../interfaces/payload";
import Usuario, { IUsuario } from "../../models/usuario";
import menu from "src/models/menu";
import { ISubmenu } from "../../models/submenu";
import { submenu } from "src/controllers/submenu";


export const validateRol = async (payload: IPayload, validator: String): Promise<Boolean> => {

    let usuarioResult: IUsuario | null = await Usuario.findOne({ _id: payload._id })
        .populate({
            path: "rol",
            model: "rol",
            populate: [{
                path: "menus._id",
                model: "menu",
            }, {
                path: "menus.submenus._id",
                model: "submenu",
                match: { url: validator }
            }
            ]
        }).exec();
    //get the ROL for extract menus then
    let rol = usuarioResult?.rol;

    //extracting menus to validate one per one submenus items
    let menus = rol?.menus;
    //we declare de result to return finishing foreach
    let resultBolean: Boolean = false;

    //here we take one per one submenu item and validate if some menu item hace the url for auth
    menus?.forEach(menu => {
        let submenus = menu.submenus as ISubmenu[];
        submenus?.forEach(submenu => {
            if (submenu._id) {
                //if exist one submenu with this rule we return true
                resultBolean = true;
            }
        })
    })
    return resultBolean;
}