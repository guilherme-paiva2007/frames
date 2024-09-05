// Arquivo executável com Node.js após atualizações no desenvolvimento.

const fs = require('fs')

fs.writeFile('./js/import.js', "", () => {})
const files = ['prototype.js', 'script.js', 'config.js', 'load.js']

files.forEach(file => {
    fs.readFile(`./js/${file}`, 'utf-8', (err, info) => {
        if (file == "import.js") return;
        fs.appendFile('./js/import.js', `\t//${file.toUpperCase()}\n\n${info}\n\n`, () => {})
    })
})

// fs.readdir('./js', 'utf-8', (err, files) => {
//     console.log(files)
//     files.forEach(file => {
//         fs.readFile(`./js/${file}`, 'utf-8', (err, info) => {
//             if (file == "import.js") return;
//             fs.appendFile('./js/import.js', `\t//${file.toUpperCase()}\n\n${info}\n\n`, () => {})
//         })
//     })
// })