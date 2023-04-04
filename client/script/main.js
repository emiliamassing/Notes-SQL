import '../style/general.css'
import { printLoginForm } from './printLoginForm';

const userBtnContainer = document.querySelector('.loginBtns');

function printLoginBtn() {
    let printFormBtn = document.createElement('button');
    printFormBtn.innerHTML = 'Login';
    userBtnContainer.appendChild(printFormBtn);

    printFormBtn.addEventListener('click', printLoginForm);
};

printLoginBtn();