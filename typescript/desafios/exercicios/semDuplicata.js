var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function SemDuplicacao(err) {
}
var err1 = [1, 2, 1, 2, 1, 3, 3, 3, 3];
var arr = __spreadArray([], new Set(err1), true);
console.log(arr);
// Log(`${arr}`)
function Log(msg) {
    return console.log(msg);
}
