let startpage = document.querySelector('.startpage');
let loginBtns = document.querySelector('.loginBtns');

export function getDocuments() {
    console.log('Overview of documents');

    startpage.innerHTML = '';

    fetch('http://localhost:3000/documents')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        printDocumentOverview(data);
    })
    .catch(err => {
        console.log('Error: ', err);
    })
};

//printDocumentOverview

function printDocumentOverview(data) {

    let container = document.createElement('section');
    container.className = 'documentViewerContainer';

    data.map(note => {
        let documentCard = document.createElement('div');
        documentCard.className = 'documentOverviewCard';

        let title = document.createElement('h3');
        let summary = document.createElement('p');
        let author = document.createElement('p');
        let button = document.createElement('button');
        button.id = note.noteId;

        title.innerHTML = note.title;
        summary.innerHTML = 'Summary: ' + note.summary;
        author.innerHTML = 'Author: ' + note.author;
        button.innerHTML = 'View full document';

        documentCard.append(title, summary, author, button);
        container.appendChild(documentCard);
    });

    startpage.appendChild(container);
};