var name = "frefr";
(function (name) {
    name = '32333';
    if (typeof name === "undefined") {
        var name = '666';
        console.log('bye world');
    } else {
        console.log('hello world');
    }
})(name);
console.log(name);

console.log(process.argv[2])

// function gogo(ttt) {
//     ttt();
// }
//
// gogo(function () {
//     console.log('111');
// });