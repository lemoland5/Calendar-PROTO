const email = document.getElementById('email');
const emailerror = document.getElementById('emailerror');

const password = document.getElementById('inputpassword');
const password2 = document.getElementById('password2');
const passworderror = document.getElementById('passworderror');

const passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/);
const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

const inputs = new Array(email, password, password2);
console.log(inputs);

const registerbutton = document.getElementById('registerbutton');

registerbutton.disabled = true;

const submitEval = () => {
    if(password.value == password2.value && passRegex.test(password.value) && email.value.search(emailRegex) == 0 ) registerbutton.disabled = false;
    else registerbutton.disabled = true;
}

const emailEval = () => {
    if(email.value.search(emailRegex) == 0 || email.value.length == 0) emailerror.style.display = 'none';
    else emailerror.style.display = 'block';
}

const passwordEval = () => {
    if(password.value == password2.value && password2.value.length != undefined) passworderror.style.display = 'none'
    else passworderror.style.display = 'block'
}

emailEval();
submitEval();
passwordEval();

inputs.forEach(element => {
    element.addEventListener('input', () => {
        submitEval();
        passwordEval();
        emailEval();
    })
})
