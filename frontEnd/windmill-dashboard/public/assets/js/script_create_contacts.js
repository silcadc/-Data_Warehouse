//---Add contact
let name_newContact = document.getElementById("name_input_newContact");
let lastname_newContact = document.getElementById("lastname_input_newContact");
let profile_newContact = document.getElementById("profile_input_newContact");
let email_newContact = document.getElementById("email_input_newContact");
let company_newContact = document.getElementById("company_input_newContact");
let region_newContact = document.getElementById("region_input_newContact");
let country_newContact = document.getElementById("country_input_newContact");
let city_newContact = document.getElementById("city_input_newContact");
let adress_newContact = document.getElementById("address_input_newContact");
let interest_newContact = document.getElementById("interest_input_newContact");

let save_newContact = document.getElementById("save_newContact");
let cancel_newContact = document.getElementById("cancel_newContact");

let token = localStorage.getItem("sesionToken")
console.log(token)

/*---------------------------*/
/*     create new contact    */
/*---------------------------*/
save_newContact.addEventListener("click", () => {
    fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': name_newContact.value, 
            'lastname': lastname_newContact.value, 
            'profile': profile_newUser.value, 
            'email': email_newContact.value, 
            'company': password_newUser.value,
            'address': adress_newContact.value, 
             
            'interests': is_admin,  
            
            'city': password_newUser.value
        })
    })
    //.then (response => response.json())este json era un problema, enviaba datos undefined
    .then (response => { 
        location.href = '../users.html'
    })
    .catch (error => console.log("error al crear usuario" + error) )
    
})