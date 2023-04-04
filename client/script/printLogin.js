let root = document.querySelector('.root');
let startpage = document.querySelector('.startpage');
let userBtnContainer = document.querySelector('.loginBtns');

export function printLoginForm() {
    let form = document.createElement('form');
    let heading = document.createElement('h2');
    let userInput = document.createElement('input');
    let passwordInput = document.createElement('input');
    let submitBtn = document.createElement('button');

    form.className = 'loginForm';
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
        console.log('Signed in');
        printLoggedinStartPage();
    })
    .catch(err => {
        console.log('Error: ', err);
    });
}

function printLoggedinStartPage() {
    startpage.innerHTML = '';

    const logoutBtn = document.createElement('button');
    logoutBtn.innerHTML = 'Log Out';
    logoutBtn.classname = 'logoutBtn';

    userBtnContainer.appendChild(logoutBtn);

    let optionContainer = document.createElement('div');
    optionContainer.className = 'optioncontainer';
    
    const greeting = document.createElement('p');
    const viewDocumentBtn = document.createElement('button');
    const createDocumentBtn = document.createElement('button');
    greeting.className = 'greeting';
    viewDocumentBtn.className = 'viewDocumentBtn';
    createDocumentBtn.className = 'createDocumentBtn';

    greeting.innerHTML = 'Welcome!';
    viewDocumentBtn.innerHTML = 'View all documents';
    createDocumentBtn.innerHTML = 'Create a new document';

    optionContainer.append(greeting, viewDocumentBtn, createDocumentBtn);
    startpage.appendChild(optionContainer);
};