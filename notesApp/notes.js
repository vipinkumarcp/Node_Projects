const fs = require('fs')


const getNotes = function() {

    return 'Your notes...'

}


const addNote = function(title, body) {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter(function(note) {
    //       return note.title == title
    // })
    //another method to stop after first match(find) 
    const duplicateNote = notes.find((note) => note.title ==title)



    //we din't find any duplicate notes if duplicateNotes.length == 0
//     if (duplicateNotes.length === 0) {
//     notes.push(
//         {
//             title: title,
//             body: body
//         }
//     )
//     saveNotes(notes)
//     } else {
//              console.log('Note title taken')
//     }
// }

//another method to run same script using duplicateNote
if (!duplicateNote) {
    notes.push({
        title:title,
        body:body
    })
    saveNotes(notes)
    console.log("New note added")
} else {
    console.log("Note title already taken")
}
}

const removeNote = function(title) {
    const notes = loadNotes()
    //notes want to keep
    const notesToKeep = notes.filter(function(note) {
        //return true if title matches with
        return note.title !== title
    })

    //print messgege
    if (notes.length > notesToKeep.length) {

        console.log("Note removed")
        //save all notes which not matches with title
    saveNotes(notesToKeep) 

    } else
    {

        console.log("No note found")
    }
    
}

const listNotes = () => {

    const notes = loadNotes()

    console.log("Your notes")

    notes.forEach((note) => {
        console.log(note.title)
    })

}

const saveNotes = function(notes) {

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}



const loadNotes = function() {


    try {

    const databuffer = fs.readFileSync('notes.json')
    const dataJSON = databuffer.toString()
    return JSON.parse(dataJSON)

    } catch (e) {

        //return empty array if file not found
        return []
    }
    
}

const readNotes= (title) => {

    const notes = loadNotes() 
    const notesToRead = notes.find((note) => note.title == title)
    debugger
    if (notesToRead) {
        console.log(notesToRead.title,notesToRead.body)
        }
    else {
        console.log("No notes in that title")
    }



}


//multiple exports
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes,
}