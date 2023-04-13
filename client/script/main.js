import '../style/general.css'
import { printLoginForm } from './printLogin';

const userBtnContainer = document.querySelector('.loginBtns');

export function printLoginBtn() {
    userBtnContainer.innerHTML = '';

    let printFormBtn = document.createElement('button');
    printFormBtn.innerHTML = 'Login';
    userBtnContainer.appendChild(printFormBtn);

    printFormBtn.addEventListener('click', printLoginForm);
};

printLoginBtn();