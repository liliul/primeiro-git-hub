import { userConfig } from "../config";

export class SkillsTech {
    constructor() {
        this.skills = userConfig.skillsTech;
    }

    renderSkillsTech() {

        this.skills.forEach((sk) => {
            const divSkills = document.createElement('div');
            divSkills.classList.add('item-skills');
            
            divSkills.innerHTML = `    
                <p>${sk}</p>
            `;
            
            document.getElementById('skills-tech-id').appendChild(divSkills);
        })
        
    }
}