let startpage = document.querySelector('.startpage');
let loginBtns = document.querySelector('.loginBtns');

export function printDocumentOverview() {
    console.log('Overview of documents');

    startpage.innerHTML = '';

    fetch('http://localhost:3000/documents')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log('Error: ', err);
    })
};