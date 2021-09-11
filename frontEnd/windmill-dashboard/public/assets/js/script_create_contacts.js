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

/*---------------------------*/
/*     create new contact    */
/*---------------------------*/
save_newContact.addEventListener("click", () => {
    let companyId = $("#select_company option:selected").attr("data-ref");
    let cityId = $("#select_city option:selected").attr("data-ref");
    let interestValue = $("#select_interest option:selected").attr("data-ref");
    console.log(companyId)
    console.log(cityId)
    console.log(interestValue)

    fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': name_newContact.value, 
            'lastname': lastname_newContact.value, 
            'profile': profile_newContact.value, 
            'email': email_newContact.value, 
            'company_id': companyId,
            'address': adress_newContact.value, 
            'interests': interestValue,  
            'city_id': cityId
        })
    })
    //.then (response => response.json())este json era un problema, enviaba datos undefined
    .then (response => { 
        location.href = '../contacts.html'
    })
    .catch (error => console.log("error al crear usuario" + error) )
    
})



function load_region () {
    //region
    fetch('http://localhost:3001/regions/', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        response.forEach(region => {
            const optionTag = document.createElement("option");
            optionTag.setAttribute("data-ref", region.region_id);//
            optionTag.textContent =  region.name
            document.querySelector("#select_region").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

function load_country () {
    //region
    fetch('http://localhost:3001/countries/', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        response.forEach(country => {
            const optionTag = document.createElement("option");
            optionTag.setAttribute("data-ref", country.country_id);//
            optionTag.setAttribute("data-belong", country.region_id);//
            optionTag.textContent =  country.name
            document.querySelector("#select_country").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

function load_city () {
    //region
    fetch('http://localhost:3001/cities/', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        response.forEach(city => {
            const optionTag = document.createElement("option");
            optionTag.setAttribute("data-ref", city.city_id);//
            optionTag.setAttribute("data-belong", city.country_id);//
            optionTag.textContent =  city.name
            document.querySelector("#select_city").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}


function load_company () {
    //region
    fetch('http://localhost:3001/companies/', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        response.forEach(company => {
            const optionTag = document.createElement("option");
            optionTag.setAttribute("data-ref", company.company_id);//
            optionTag.textContent =  company.name
            document.querySelector("#select_company").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

load_region()
load_country()
load_city()
load_company()