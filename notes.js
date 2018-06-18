"use strict";
const fs = require('fs');
var uniqid=require("uniqid");


var i=1;
const filename ='notes-data.json';


var getNotes = () => {
    try {
        //lire le fichier
        var texte = fs.readFileSync(filename);
        //retourne les objets
        return JSON.parse(texte);
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

var addNote = (note) => {
    let notesData=getNotes();
    if(notesData==null){
        notesData=[];
    }
    if(typeof note === 'object'){
        note.id = uniqid();
        notesData.push(note);
        if(saveFile(notesData)){
            return console.log(" note enregistrée");
        }
    }
    console.log("pas de notes sauvée");
};

var saveFile = (notes)=>{
    if(Array.isArray(notes)){
        try {
           fs.writeFileSync(filename, JSON.stringify(notes));
           return notes;
        } catch (error) {
            console.log(error.message);
        }
    }
    console.log("pas un tableau");
};

var removeNote = (id) => {
    if (!fs.existsSync(filename)) {
        return console.log("Notes n'existe pas");
    }
    if (typeof id === 'string') {
        let notes = getNotes();
        let filterednotes = notes.filter((note) => note.id !== id);
        if (saveFile(filterednotes)) {
            return notes.length != filterednotes.length;
        }
        console.log("Notes non Sauvé");
    }
};

/*module.exports = {
    lire : getNotes,
    sauver : saveNotes
};*/

module.exports = {
    getNotes,
    addNote,
    removeNote
};