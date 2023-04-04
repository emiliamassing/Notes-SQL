let root = document.querySelector('.root');

export function printLoginForm() {
    let form = document.createElement('form');
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


    form.append(heading, userInput, passwordInput, submitBtn);

    root.innerHTML = '';
    root.appendChild(form);

    submitBtn.addEventListener('click', e => {
       // e.preventDefault();
        loginUser();
    });
};

function loginUser() {
    console.log('Login');
}