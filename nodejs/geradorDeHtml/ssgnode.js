import fs from "fs";

const htmlContent = `
 
`;

const indexPath = "./index.html";
let indexHtml = fs.readFileSync(indexPath, "utf-8");

// Substituir <div id="root"></div> pelo conteúdo
indexHtml = indexHtml.replace(
  '',
  `${htmlContent}`
);

fs.writeFileSync(indexPath, indexHtml);
console.log("Prerenderização completa");
