

document.getElementById("getCurrentDate").innerHTML = getCurrentDate();

function getCurrentDate() {
    const month = ["January", "Feburary", "March", "April", "May", "Jun", "July", "August", "September", "Octobre", "November", "December"];
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    return week[currentDate.getDay()] + ", " + month[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear() + "  " + currentDate.getHours() + "h " + currentDate.getMinutes() + "min " + currentDate.getSeconds() + "s";
}

function disable(id) {
    document.getElementById(id).disabled = true;
}

document.getElementById('form').addEventListener('submit', (event) => validateForm('form', event));


//Breed Preference
function validateForm(formName, event) {
    let form = document.forms[formName];

    let isValid = true;

    for (let i = 0; i < form.elements.length; i++) {

        if (form.elements[i].tagName === 'INPUT' && !form.elements[i].disabled) {
            if (!form.elements[i].value.trim()) {
                isValid = false;
       alert("Please enter a breed preference.");         
    
                break;
            }
    }
}

//Species
    let petBoxes = document.getElementsByName('pet');
    let anypet = Array.from(petBoxes).some(checkbox => checkbox.checked);
    if (!anypet) {
        isValid = false;

        alert("Please choose a species."); 
     
    }

//Gender
    let genderBoxes = document.getElementsByName('gender');
    let anyGender = Array.from(genderBoxes).some(checkbox => checkbox.checked);
    if (!anyGender) {
        isValid = false;

        alert("Please choose a gender preference.");
      
    }

//Friendliness
        const formData = new FormData(document.getElementById('form'));
        const checkedOptions = formData.getAll('friend[]');
            if (checkedOptions.length === 0) {
                isValid = false;

                alert("Please select at least one option for for friendliness.")
             
            } 
//Pet description
    
            if (document.getElementById("petDes").value.trim()=='') {
                isValid = false;
                       
              alert("Please provide a description about your pet.");
              
            }

//Owner first name
            if (document.getElementById("fName").value.trim()=='') {
                isValid = false;
                
                alert("Please enter your first name.");
              
            }

//Owner last name
            if (document.getElementById("lName").value.trim()=='') {
                isValid = false;
            
                alert("Please enter your last name.");
            
            }
         
//email

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const email = document.getElementById("email").value;

    if (!emailPattern.test(email)) {
        isValid = false;
        alert("Please entered a valid email address");
    }

        if (!isValid) {
            event.preventDefault();
        }
        return isValid;

}

document.getElementById("createAccountForm").addEventListener("submit", (event) => validateCreation(event));
function validateCreation(event) {
    console.log("Validating creation");
    const form = document.forms['createAccountForm']; 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    if (!/^[A-Za-z0-9]+$/.test(username)) {
        alert('Invalid username format. Only letters and digits are allowed.');
        isValid = false;
    }

    if (!/(?=.*\d)(?=.*[a-zA-Z]).{4,}/.test(password)) {
        alert('Invalid password format. Must be at least 4 characters long, include at least one letter and one digit.');
        isValid = false;
    }
    if(!isValid){
        event.preventDefault();
    }
    return isValid;
};
