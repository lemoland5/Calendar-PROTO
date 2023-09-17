const submit = document.getElementById('formsubmit');
const submiterror = document.getElementById('submiterror');

let canSubmit = true;

if(parseDate('today').setHours(0,0,0,0) < lastDay){
    console.log('CANT SUBMIT');
    canSubmit = false;

    submit.disabled = true;
    submiterror.innerText = 'You can submit again tomorrow';
}