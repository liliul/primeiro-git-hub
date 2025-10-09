"use strict";
function Fahrenheit(celsius) {
    return ((celsius * 9 / 5) + 32).toFixed() + "°F";
}
const fahrenheit = Fahrenheit(28);
console.log(fahrenheit);
function Celsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed() + "°C";
}
const celsius = Celsius(82);
console.log(celsius);
