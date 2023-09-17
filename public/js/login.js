const visbutton = document.getElementById('visbutton');
const passwordinput = document.getElementById('inputpassword');

let isPasswordVisible = false;

visbutton.addEventListener('click', () => {
    if(isPasswordVisible == false){
        isPasswordVisible = true;
        passwordinput.type = "text";

        visbutton.src = "img/passwordvis.png";
    }    

    else{
        isPasswordVisible = false;
        passwordinput.type = "password";

        visbutton.src = "img/passwordhidden.png";
    }    
})

