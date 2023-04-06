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

    titleInput.className = 'titleInput';
    summaryInput.className = 'summaryInput';
    summaryInput.maxLength = '280';
    authorInput.className = 'authorInput';
    textContent.className = 'textContent';
    
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

    let previewHeading = document.createElement('h2');
    previewHeading.innerHTML = 'Preview of your document';
    textPreview.appendChild(previewHeading);

    container.append(form, textPreview);
    buttonContainer.append(previewBtn, submitBtn);
    form.append(titleLabel, titleInput, summaryLabel, summaryInput, authorLabel, authorInput, textContent, buttonContainer);
    startpage.append(container);

    tinymce.init({
        selector: '.textContent',
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
        previewDocument();
    });

    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        saveNewDocument();
    });
};

function previewDocument() {
    let previewContainer = document.createElement('div');

    const textContent = document.querySelector('.textContent'); 

    console.log(textContent.value);

    textPreview.innerHTML = textContent.value;
};

function saveNewDocument() {
    const titleInput = document.querySelector('.titleInput');
    const summaryInput = document.querySelector('.summaryInput');
    const authorInput = document.querySelector('.authorInput');
    const textContent = document.querySelector('.textContent'); 

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