
const fs = require('fs')

// const book = {

//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
// }

//javascript take object , array and string as input and return json
// const bookJSON = JSON.stringify(book)
// console.log(bookJSON)

//takes json string and gives back object

// const parsedData = JSON.parse(bookJSON)
// console.log(parsedData.title)

// fs.writeFileSync('1-json.json', bookJSON)



const dataBuffer = fs.readFileSync('1-json.json')
const dataJson = dataBuffer.toString()
const data = JSON.parse(dataJson)
console.log(data.title)

data.title = 'The Dark Tower'
data.author='some one i dont know'

const dataJson2 = JSON.stringify(data)
fs.writeFileSync('1-json.json', dataJson2)




