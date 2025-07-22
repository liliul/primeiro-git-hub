export function Cor() {
    const cores = {
        textoCor: "#fa7f72",
        cardHoverCor: "#E9967A",
        txtPskills1: "#111111",
    }

    let txt        = "--bg-techs";
    let lang       = "--bg-lang";
    let cardHover  = "--card-hover-cor";
    let txtPskills = "--text-p-skills";

    if (!cores) return

    document.documentElement.style.setProperty(txt, cores.textoCor);
    document.documentElement.style.setProperty(lang, cores.textoCor);
    document.documentElement.style.setProperty(cardHover, cores.cardHoverCor);
    document.documentElement.style.setProperty(txtPskills, cores.txtPskills1);
}