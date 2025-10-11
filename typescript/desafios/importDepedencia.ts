import factory from "./exportDepedencia"

// funciona primeira parte
// const factoryCreate = factory({callback: 'naruto', classes: 'sasuke'})
// factoryCreate.textocallback()
// factoryCreate.textoClasses()

// ------------------------------------ //

function retornoCallback(txt: string) {
    console.log('callback: ', txt)
}
function retornoClasses(txt: string) {
    console.log('classes: ', txt)
    
}

const factoryCreate = factory({callback: retornoCallback, classes: retornoClasses})
factoryCreate.textocallback('naruto')
factoryCreate.textoClasses('sasuke')

