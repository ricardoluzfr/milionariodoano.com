/* JS bem simples que mantem o ano atualizado nas páginas */
var date = new Date();
var year = date.getFullYear();
console.log(year);

document.getElementById('year').innerHTML = year;
