"use strict";
// export interface Ifactory {
// 	callback: string 
// 	classes: string 
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = factory;
function factory(_a) {
    var callback = _a.callback, classes = _a.classes;
    function textocallback(txt) {
        callback(txt);
    }
    function textoClasses(txt) {
        classes(txt);
    }
    return { textocallback: textocallback, textoClasses: textoClasses };
}
