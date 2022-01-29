// fs for managing file system

//to call module  and stored in variable
const fs = require('fs')
const yargs = require('yargs')

// const chalk = require('chalk')

//using sync method to write file
//fs.writeFileSync('notes.txt', 'my name is')

//append file sync method not overwrite
//fs.appendFileSync('notes.txt', ' my name is dgagag')

//importing file from another file
//const name= require('./utlis.js')


//console.log(name)

//npm i validator@10.8.0

//for modules installed

// const validator = require('validator')

// console.log(validator.isEmail('vipin@gmail.com'))
// console.log(validator.isEmail('car.com'))
// console.log(chalk.blue('Hello world!'))

// console.log(chalk.blue('Hello world!'));

// to get argument list from command line
// run node app.js "any arungument" to add agrument

//to list arugment in console
//console.log(process.argv)

// const command = process.argv[2]

// if (command === 'add') {
//     console.log('Adding note')
// } else if (command === 'remove') {
//     console.log('Removing note')
// }

// console.log(process.argv)

// to add argument in command line
// node app.js add "any argument"
// node app.js add --title "any title" --body "any body"

//yargs for parsing from cmd

// console.log(process.argv)
// console.log(yargs.argv)


// customize yargs version
yargs.version('1.1.0')

//create add command
yargs.command({

    //command name
    command: 'add',
    describe: 'Add a new note',
    //function to run
    handler: function () {
        console.log('Adding note')
    }

})

//create remove command

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing note')
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'listing the note',
    //property which command to suppoert
    builder: {
        title: {
            describe: 'title of note',
            //default value to need to be passed
            demandOption: true,
            //supported type
            type: 'string',
        },
        body: {
            describe: 'body of note',
            //default value to need to be passed
            demandOption: true,
            //supported type
            type: 'string',
        }
    },

    handler: function(argv) {
        console.log('Title '+argv.title + 'body '+argv.body)
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'read the note',
    handler: function() {
        console.log('read the note')
    }
})

// console.log(yargs.argv)
yargs.parse()

