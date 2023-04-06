let startpage = document.querySelector('.startpage');


export function printEditor() {
    startpage.innerHTML = '';

    let form = document.createElement('form');
    let titleLabel = document.createElement('label');
    let titleInput = document.createElement('input');
    let summaryLabel = document.createElement('label');
    let summaryInput = document.createElement('textarea');
    let textArea = document.createElement('textarea');
    let submitBtn = document.createElement('button');

    textArea.className = 'textContent';

    titleLabel.innerHTML = 'Title';
    summaryLabel.innerHTML = 'Summary';
    submitBtn.innerHTML = 'Save Document';

    form.append( titleLabel, titleInput, summaryLabel, summaryInput, textArea, submitBtn);
    startpage.appendChild(form);

    tinymce.init({
        selector: '.textContent',
        plugins: 'code',
        toolbar: 'undo redo | forecolor backcolor | stylesselect bold italic | alignleft alignright | code',

        /*setup: function(editor) {
            editor.on('change', function(){
                editor.save();
            });
        }*/
    });
};