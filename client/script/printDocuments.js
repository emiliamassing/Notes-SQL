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
    
    let submitBtn = document.createElement('button');

    textContent.className = 'textContent';

    titleLabel.innerHTML = 'Title';
    summaryLabel.innerHTML = 'Summary';
    submitBtn.innerHTML = 'Save Document';

    form.append( titleLabel, titleInput, summaryLabel, summaryInput, textContent, submitBtn);
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
    });
};

function printNewDocument() {
    console.log(textContent.value);

    textResult.innerHTML = textContent.value;
}