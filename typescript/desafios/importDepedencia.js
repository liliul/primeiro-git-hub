"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exportDepedencia_1 = require("./exportDepedencia");
// funciona primeira parte
// const factoryCreate = factory({callback: 'naruto', classes: 'sasuke'})
// factoryCreate.textocallback()
// factoryCreate.textoClasses()
// ------------------------------------ //
function retornoCallback(txt) {
    console.log('callback: ', txt);
}
function retornoClasses(txt) {
    console.log('classes: ', txt);
}
var factoryCreate = (0, exportDepedencia_1.default)({ callback: retornoCallback, classes: retornoClasses });
factoryCreate.textocallback('naruto');
factoryCreate.textoClasses('sasuke');
