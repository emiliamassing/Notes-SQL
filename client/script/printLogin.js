import { printEditor } from "./createDocuments";
import { printLoginBtn } from "./main";
import { getDocuments } from "./viewDocuments";

let startpage = document.querySelector('.startpage');
let userBtnContainer = document.querySelector('.loginBtns');

export function printLoginForm() {
    document.body.style.display = 'flex';
    startpage.innerHTML = '';

    let form = document.createElement('form');
    form.className = 'loginForm';
    
    let heading = document.createElement('h2');
    let userInput = document.createElement('input');
    let passwordInput = document.createElement('input');
    let submitBtn = document.createElement('button');

    heading.innerHTML = 'Login to create new notes';
    submitBtn.innerHTML = 'Login';
    submitBtn.className = 'loginBtn';

    userInput.placeholder = 'Username';
    passwordInput.placeholder = 'Password';

    userInput.required = true;
    passwordInput.required = true;
    passwordInput.type = 'password';

    userInput.className = 'userInput';
    passwordInput.className = 'passwordInput';

    form.append(heading, userInput, passwordInput, submitBtn);

    userBtnContainer.innerHTML = '';

    startpage.appendChild(form);

    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        loginUser();
    });
};

function loginUser() {
    const userInput = document.querySelector('.userInput');
    const passwordInput = document.querySelector('.passwordInput');
    const form = document.querySelector('loginForm');
    let userInfo = {username: userInput.value, password: passwordInput.value};

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        userInput.value = '';
        passwordInput.value = '';

        if(data[0].username) {
            printLoggedinStartPage(data);
            localStorage.setItem('currentlyLoggedIn', JSON.stringify(data[0].username));
        }else { 
            let errorMessage = document.createElement('p');
            errorMessage.innerHTML = 'User not found';
            
            form.appendChild(errorMessage);
        };

    })
    .catch(err => {
        console.log('Error: ', err);
    });
}

export function printLoggedinStartPage() {
    document.body.style.display = 'block';

    startpage.innerHTML = '';
    userBtnContainer.innerHTML = '';

    if(document.querySelector('.goBackBtn')) {
        document.querySelector('.goBackBtn').remove();
    };

    const logoutBtn = document.createElement('button');
    logoutBtn.innerHTML = 'Log Out';
    logoutBtn.className = 'logoutBtn';

    userBtnContainer.appendChild(logoutBtn);

    let optionContainer = document.createElement('div');
    optionContainer.className = 'optionContainer';
    
    const greeting = document.createElement('p');
    const viewDocumentBtn = document.createElement('button');
    const createDocumentBtn = document.createElement('button');
    greeting.className = 'greeting';
    viewDocumentBtn.className = 'viewDocumentBtn';
    createDocumentBtn.className = 'createDocumentBtn';

    greeting.innerHTML = `Welcome!`;
    viewDocumentBtn.innerHTML = 'View all documents';
    createDocumentBtn.innerHTML = 'Create a new document';

    optionContainer.append(greeting, viewDocumentBtn, createDocumentBtn);
    startpage.appendChild(optionContainer);

    logoutBtn.addEventListener('click', logoutUser);

    viewDocumentBtn.addEventListener('click', getDocuments);
    createDocumentBtn.addEventListener('click', printEditor);
};

function logoutUser() {
    localStorage.removeItem('currentlyLoggedIn');
    
    startpage.innerHTML = '';
    userBtnContainer.innerHTML = '';

    printLoginBtn();
}; 