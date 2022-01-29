const fs = require('fs')


const getNotes = function() {

    return 'Your notes...'

}


const addNote = function(title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note) {
          return note.title == title
    })

    //we din't find any duplicate notes if duplicateNotes.length == 0
    if (duplicateNotes.length === 0) {
    notes.push(
        {
            title: title,
            body: body
        }
    )
    saveNotes(notes)
    } else {
             console.log('Note title taken')
    }
}

const removeNote = function(title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note) {
        return note.title == title
    })

    if (notesToKeep.length === 0) {
        console.log('Note not found')
    } else {
        saveNotes(notesToKeep)
    }
}

const removeNotes = function(notes) {

    


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


//multiple exports
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
}