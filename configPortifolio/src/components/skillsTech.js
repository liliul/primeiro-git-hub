import { userConfig } from "../config";

export class SkillsTech {
    constructor() {
        this.skills = userConfig.skillsTech;
    }

    renderSkillsTech() {

        this.skills.forEach((sk) => {
            const liSkills = document.createElement('li');
            liSkills.classList.add('item-skills');

            liSkills.innerHTML = `    
                <p>${sk}</p>
            `;

            document.getElementById('skills-tech-id').appendChild(liSkills);
        })

    }
}