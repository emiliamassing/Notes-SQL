let startpage = document.querySelector('.startpage');


export function printEditor() {
    startpage.innerHTML = '';

    let textArea = document.createElement('textarea');
    textArea.className = 'textContent';

    startpage.appendChild(textArea);

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
};