import { printLoggedinStartPage } from "./printLogin";

let startpage = document.querySelector('.startpage');
let loginBtns = document.querySelector('.loginBtns');
let textPreview = document.createElement('div');
textPreview.className = 'textPreview';

export function printEditor() {
    startpage.innerHTML = '';
    textPreview.innerHTML = '';

    let container = document.createElement('section');
    container.className = 'editContainer';
    
    let form = document.createElement('form');
    let titleLabel = document.createElement('label');
    let titleInput = document.createElement('input');
    let summaryLabel = document.createElement('label');
    let summaryInput = document.createElement('textarea');
    let authorLabel = document.createElement('label');
    let authorInput = document.createElement('input');
    let textContent = document.createElement('textarea');

    titleInput.className = 'titleInputCreate';
    summaryInput.className = 'summaryInputCreate';
    summaryInput.maxLength = '280';
    authorInput.className = 'authorInputCreate';
    textContent.className = 'textContentCreate';
    
    titleLabel.innerHTML = 'Title';
    summaryLabel.innerHTML = 'Summary';
    authorLabel.innerHTML = 'Author';

    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'buttonContainerEditMode';

    let previewBtn = document.createElement('button')
    let submitBtn = document.createElement('button');

    previewBtn.className = 'previewEditorBtn';
    submitBtn.className = 'submitEditorBtn'

    previewBtn.innerHTML = 'Show preview';
    submitBtn.innerHTML = 'Save Document';

    let heading = document.createElement('h2');
    heading.innerHTML = 'Preview of your document';
    textPreview.appendChild(heading);

    container.append(form, textPreview);
    buttonContainer.append(previewBtn, submitBtn);
    form.append(titleLabel, titleInput, summaryLabel, summaryInput, authorLabel, authorInput, textContent, buttonContainer);
    startpage.append(container);

    tinymce.init({
        selector: '.textContentCreate',
        plugins: 'code',
        toolbar: 'undo redo | forecolor backcolor | stylesselect bold italic | alignleft alignright | code',

        setup: function(editor) {
            editor.on('change', function(){
                editor.save();
            });
        }
    });

    previewBtn.addEventListener('click', e => {
        e.preventDefault();
        previewDocumentCreated();
    });

    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        saveNewDocument();
    });
};

function previewDocumentCreated() {
    textPreview.innerHTML = '';

    const titleInput = document.querySelector('.titleInputCreate');
    const summaryInput = document.querySelector('.summaryInputCreate');
    const authorInput = document.querySelector('.authorInputCreate');
    const textContent = document.querySelector('.textContentCreate');

    let heading = document.createElement('h2');
    let title = document.createElement('p');
    let summary = document.createElement('p');
    let author = document.createElement('p');
    let text = document.createElement('p');

    heading.innerHTML = 'Preview of your document';
    title.innerHTML = 'Title: ' + titleInput.value;
    summary.innerHTML = 'Summary: ' + summaryInput.value;
    author.innerHTML = 'Author: ' + authorInput.value;
    text.innerHTML = textContent.value;

    textPreview.append(heading, title, summary, author, text);
};

function saveNewDocument() {
    const titleInput = document.querySelector('.titleInputCreate');
    const summaryInput = document.querySelector('.summaryInputCreate');
    const authorInput = document.querySelector('.authorInputCreate');
    const textContent = document.querySelector('.textContentCreate'); 

    let newDocument = {
        title: titleInput.value,
        summary: summaryInput.value,
        author: authorInput.value,
        textContent: textContent.value
    };

    fetch('http://localhost:3000/documents/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDocument)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        loginBtns.innerHTML = '';
        printLoggedinStartPage();
    })
    .catch(err => {
        console.log('Error: ', err);
    });
};

export function getSpecificDocument(documentId) {

    fetch('http://localhost:3000/documents/' + documentId)
    .then(res => res.json())
    .then(data => {
        printEditorOfExistingDocument(data);
    })
    .catch(err => {
        console.log('Error: ', err);
    })
}

export function printEditorOfExistingDocument(note) {
    startpage.innerHTML = '';
    textPreview.innerHTML = '';

    let container = document.createElement('section');
    container.className = 'editContainer';
    
    let form = document.createElement('form');
    let titleLabel = document.createElement('label');
    let titleInput = document.createElement('input');
    let summaryLabel = document.createElement('label');
    let summaryInput = document.createElement('textarea');
    let authorLabel = document.createElement('label');
    let authorInput = document.createElement('input');
    let textContent = document.createElement('textarea');

    titleInput.className = 'titleInputEdit';
    summaryInput.className = 'summaryInputEdit';
    summaryInput.maxLength = '280';
    authorInput.className = 'authorInputEdit';
    textContent.className = 'textContentEdit';

    titleInput.value = note[0].title;
    summaryInput.value = note[0].summary;
    authorInput.value = note[0].author;
    textContent.value = note[0].textContent;
    
    titleLabel.innerHTML = 'Title';
    summaryLabel.innerHTML = 'Summary';
    authorLabel.innerHTML = 'Author';

    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'buttonContainerEditMode';

    let previewBtn = document.createElement('button')
    let updateBtn = document.createElement('button');

    previewBtn.className = 'previewEditorBtn';
    updateBtn.className = 'submitEditorBtn';
    updateBtn.id = note[0].noteId;

    previewBtn.innerHTML = 'Show preview';
    updateBtn.innerHTML = 'Update Document';

    let heading = document.createElement('h2');
    heading.innerHTML = 'Preview of your document';
    textPreview.appendChild(heading);

    container.append(form, textPreview);
    buttonContainer.append(previewBtn, updateBtn);
    form.append(titleLabel, titleInput, summaryLabel, summaryInput, authorLabel, authorInput, textContent, buttonContainer);
    startpage.append(container);

    tinymce.init({
        selector: '.textContentEdit',
        plugins: 'code',
        toolbar: 'undo redo | forecolor backcolor | stylesselect bold italic | alignleft alignright | code',

        setup: function(editor) {
            editor.on('change', function(){
                editor.save();
            });
        }
    });

    previewBtn.addEventListener('click', e => {
        e.preventDefault();
        previewDocumentEdited();
    });

    updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateDocument(e.currentTarget.id);
    });
};

function previewDocumentEdited() {
    textPreview.innerHTML = '';

    const titleInput = document.querySelector('.titleInputEdit');
    const summaryInput = document.querySelector('.summaryInputEdit');
    const authorInput = document.querySelector('.authorInputEdit');
    const textContent = document.querySelector('.textContentEdit');

    let heading = document.createElement('h2');
    let title = document.createElement('p');
    let summary = document.createElement('p');
    let author = document.createElement('p');
    let text = document.createElement('p');

    heading.innerHTML = 'Preview of your document';
    title.innerHTML = 'Title: ' + titleInput.value;
    summary.innerHTML = 'Summary: ' + summaryInput.value;
    author.innerHTML = 'Author: ' + authorInput.value;
    text.innerHTML = textContent.value;

    textPreview.append(heading, title, summary, author, text);
};

function updateDocument(noteId) {
    const titleInput = document.querySelector('.titleInputEdit');
    const summaryInput = document.querySelector('.summaryInputEdit');
    const authorInput = document.querySelector('.authorInputEdit');
    const textContent = document.querySelector('.textContentEdit'); 

    let editedDocument = {
        title: titleInput.value,
        summary: summaryInput.value,
        author: authorInput.value,
        textContent: textContent.value
    };

    fetch('http://localhost:3000/documents/edit/' + noteId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedDocument)
    })
    .then(res => res.json())
    .then(data => {
        printLoggedinStartPage();
    })
    .catch(err => {
        console.log('Error: ', err);
    });
};