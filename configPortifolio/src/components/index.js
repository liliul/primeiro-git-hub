import { Card } from "./card.js";
import { userConfig } from "../config/index.js";

const arrayInfos = userConfig.cardInfos

arrayInfos.map((infos) => {
    const card = new Card(infos.title, infos.description, infos.snapshot, infos.linguages, infos.iframe);
    card.render();
})
