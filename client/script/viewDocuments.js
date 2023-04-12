import { getSpecificDocument } from "./createDocuments";

let startpage = document.querySelector('.startpage');
let loginBtns = document.querySelector('.loginBtns');
let viewDocumentContainer = document.createElement('section');
viewDocumentContainer.className = 'viewDocumentContainer';

export function getDocuments() {
    console.log('Overview of documents');

    if(document.querySelector('.goBackBtn')) {
        document.querySelector('.goBackBtn').remove();
    };

    startpage.innerHTML = '';

    fetch('http://localhost:3000/documents')
    .then(res => res.json())
    .then(data => {
        printDocumentOverview(data);
    })
    .catch(err => {
        console.log('Error: ', err);
    })
};

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

        button.addEventListener('click', (e) => {
           getFullDocument(e.target.id);
        });
    });

    startpage.appendChild(container);
};

function getFullDocument(documentId) {
    startpage.innerHTML = '';

    fetch('http://localhost:3000/documents/' + documentId)
    .then(res => res.json())
    .then(data => {
        viewFullDocument(data);
    })
    .catch(err => {
        console.log('Error: ', err);
    })
};

function viewFullDocument(note) {
    viewDocumentContainer.innerHTML = '';

    let goBackBtn = document.createElement('button');
    goBackBtn.innerHTML = 'Go back';
    goBackBtn.className = 'goBackBtn';

    loginBtns.prepend(goBackBtn);

    let heading = document.createElement('h2');
    let title = document.createElement('p');
    let summary = document.createElement('p');
    let author = document.createElement('p');
    let text = document.createElement('p');

    heading.innerHTML = 'Full version of your document';
    title.innerHTML = 'Title: ' + note[0].title;
    summary.innerHTML = 'Summary: ' + note[0].summary;
    author.innerHTML = 'Author: ' + note[0].author;
    text.innerHTML = note[0].textContent;

    let editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit document';
    editBtn.className = 'editBtn';
    editBtn.id = note[0].noteId;

    viewDocumentContainer.append(heading, title, summary, author, text);
    startpage.append(viewDocumentContainer, editBtn);

    goBackBtn.addEventListener('click', getDocuments);
    editBtn.addEventListener('click', (e) => {
        getSpecificDocument(e.currentTarget.id);
    });
};
