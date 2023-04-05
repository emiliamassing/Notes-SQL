let startpage = document.querySelector('.startpage');


export function printEditor() {
    startpage.innerHTML = '';

    let form = document.createElement('form');
    let titleInput = document.createElement('input');
    let summaryInput = document.createElement('textarea');
    let textArea = document.createElement('textarea');
    let submitBtn = document.createElement('button');

    textArea.className = 'textContent';

    submitBtn.innerHTML = 'Save Document';

    form.append(titleInput, summaryInput, textArea, submitBtn);
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