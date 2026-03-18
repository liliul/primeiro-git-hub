function withLogging(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Chamando com:", args);
        var result = fn.apply(void 0, args);
        console.log("Resultado:", result);
        return result;
    };
}
var sum = function (a, b) { return a + b; };
var loggedSum = withLogging(sum);
loggedSum(2, 3);
