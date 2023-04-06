let startpage = document.querySelector('.startpage');
let textResult = document.createElement('div');
let textContent = document.createElement('textarea');
textResult.className = 'textResult';


export function printEditor() {
    startpage.innerHTML = '';

    let form = document.createElement('form');
    let titleLabel = document.createElement('label');
    let titleInput = document.createElement('input');
    let summaryLabel = document.createElement('label');
    let summaryInput = document.createElement('textarea');
    let authorLabel = document.createElement('label');
    let authorInput = document.createElement('input');
    let submitBtn = document.createElement('button');

    titleInput.className = 'titleInput';
    summaryInput.className = 'summaryInput';
    summaryInput.maxLength = '280';
    authorInput.className = 'authorInput';
    textContent.className = 'textContent';
    
    titleLabel.innerHTML = 'Title';
    summaryLabel.innerHTML = 'Summary';
    authorLabel.innerHTML = 'Author';
    submitBtn.innerHTML = 'Save Document';

    form.append(titleLabel, titleInput, summaryLabel, summaryInput, authorLabel, authorInput, textContent, submitBtn);
    startpage.append(form, textResult);

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

    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        printNewDocument();
        saveNewDocument();
    });
};

function printNewDocument() {
    console.log(textContent.value);

    textResult.innerHTML = textContent.value;
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
    })
    .catch(err => {
        console.log('Error: ', err);
    });
};