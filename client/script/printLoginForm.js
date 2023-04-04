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
    passwordInput.type = 'password';

    userInput.className = 'userInput';
    passwordInput.className = 'passwordInput';

    form.append(heading, userInput, passwordInput, submitBtn);

    root.innerHTML = '';
    root.appendChild(form);

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
    })
    .catch(err => {
        console.log('Error: ', err);
    });
}