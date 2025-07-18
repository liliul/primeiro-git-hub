import OpenModalPreview from "./src/openModalPreview.js";
import CopyEmail from "./src/copyEmail.js";
import { Cor } from "./src/cor.js";

CopyEmail.copy()
Cor()

document.addEventListener('DOMContentLoaded', function () {
  console.log('O script foi carregado com sucesso!');

  document.querySelectorAll('.js-open-modal').forEach(button => {
    button.addEventListener('click', (event) => {
      const url = event.currentTarget.dataset.url;
      if (url) {
        OpenModalPreview.openModal(url);
      }
    });
  });
});
