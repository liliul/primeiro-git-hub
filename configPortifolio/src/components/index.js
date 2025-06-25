import { Card } from "./card.js";
import { MenuContatos } from './menuContato.js';
import { MenuExperiencia } from "./menuExperiencia.js";
import { SkillsTech } from "./skillsTech.js";

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

const experiencia = userConfig.experienciaMenu
const menuExperiencia = new MenuExperiencia()

experiencia.map((item) => {
    menuExperiencia.img = item.img
    menuExperiencia.nome = item.nome
    menuExperiencia.data = item.data
    menuExperiencia.oquefaz = item.oquefaz
    menuExperiencia.competencia = item.competencia
    menuExperiencia.atuacao = item.atuacao
    menuExperiencia.fezoque = item.fezoque
    menuExperiencia.build()
})


/**
 * skills
*/

const skillsTech = new SkillsTech();
skillsTech.renderSkillsTech()
