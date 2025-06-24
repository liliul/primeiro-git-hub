import { Card } from "./card.js";
import { MenuContatos } from './menuContato.js';
import { MenuExperiencia } from "./menuExperiencia.js";

import { userConfig } from "../config/index.js";

/**
 * card
 */
const arrayInfos = userConfig.cardInfos
arrayInfos.map((infos) => {
    const card = new Card(infos.title, infos.description, infos.snapshot, infos.linguages, infos.iframe);
    card.render();
})

/**
 * contatos 
 */
const menuContato = new MenuContatos(userConfig.contatosMenu)
menuContato.renderMenuContatos()

/**
 * experiencias
 */

const menuExperiencia = new MenuExperiencia()
menuExperiencia.build()
