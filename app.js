const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const argv = yargs.argv;
/*console.log("début de first-app");
console.log( 'process.argv:', process.argv);

console.log( 'process.argv[2]:', process.argv[2] );

console.log('argv:'+argv);
console.log('argv._[0]'+argv._[0]);
console.log('argv.titi'+argv.titi);

if(argv.toto){
    console.log("il y a toto");
}
if (notes.getNotes) {
    console.log("il y a notes.getNotes");
}*/

let func = argv.add?'add': argv.del?'del':'autre';
switch (func) {
    case 'add':
        ajoute(argv.add);
        break;
    case 'del':
        supprime(argv.del);
        break;
    default:
        break;
}


var notesdata = notes.getNotes();
_.forEach(notesdata, (note) => {
    console.log(note);
});

function ajoute() {
    let n1 = {
        texte: argv.add
    };
    try {
        notes.addNote(n1);
    }
    catch (error) {
        console.log(error.message);
    }
}

function supprime() {
    try {
        if (notes.removeNote(argv.del))
            console.log('note supprimée');
        else
            console.log('pas de note supprimée');
    }
    catch (error) {
        console.log(error.message);
    }
}

