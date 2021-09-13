//---Add contact
let name_newContact = document.getElementById("name_input_newContact");
let lastname_newContact = document.getElementById("lastname_input_newContact");
let profile_newContact = document.getElementById("profile_input_newContact");
let email_newContact = document.getElementById("email_input_newContact");
let company_newContact = document.getElementById("company_input_newContact");
let region_newContact = document.getElementById("region_input_newContact");
let country_newContact = document.getElementById("country_input_newContact");
let city_newContact = document.getElementById("city_input_newContact");
let address_newContact = document.getElementById("address_input_newContact");
let interest_newContact = document.getElementById("interest_input_newContact");

let save_newContact = document.getElementById("save_newContact");
let cancel_newContact = document.getElementById("cancel_newContact");

let token = localStorage.getItem("sesionToken")
let id_contact_to_edit = localStorage.getItem("key_to_edit")
localStorage.setItem("key_to_edit", "")  

load_region();
load_country();
load_city();
load_company();
/*---------------------------*/
/*     create new contact    */
/*---------------------------*/
function create_new_contact () {
    let companyId = $("#select_company option:selected").attr("data-ref");
    let cityId = $("#select_city option:selected").attr("data-ref");
    let interestValue = $("#select_interest option:selected").attr("data-ref");

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
            'address': address_newContact.value, 
            'interests': interestValue,  
            'city_id': cityId
        })
    })
    //.then (response => response.json())este json era un problema, enviaba datos undefined
    .then (response => { 
        location.href = '../contacts.html'
    })
    .catch (error => console.log("error al crear usuario" + error) )
    
}

//region
function load_region () {
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
            optionTag.textContent = region.name
            document.querySelector("#select_region").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

//country
function load_country () {
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
            optionTag.setAttribute("data-ref", country.country_id);
            optionTag.setAttribute("data-belong", country.region_id);
            optionTag.textContent = country.name
            document.querySelector("#select_country").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

//city
function load_city () {
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
            optionTag.setAttribute("data-ref", city.city_id);
            optionTag.setAttribute("data-belong", city.country_id);
            optionTag.textContent = city.name
            document.querySelector("#select_city").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

//company
function load_company () {
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
            optionTag.setAttribute("data-ref", company.company_id);
            optionTag.textContent = company.name
            document.querySelector("#select_company").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

/*-----------------------------------*/
/*     performans by old contact     */
/*-----------------------------------*/
function old_contact_show () {
    fetch('http://localhost:3001/contacts/'+ id_contact_to_edit, {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        name_newContact.value = response[0].name
        lastname_newContact.value = response[0].lastname
        email_newContact.value = response[0].email   
        profile_newContact.value = response[0].profile 

        $("#select_region").find("[data-ref='"+ response[0].region_id +"']").attr('selected', true);
        $("#select_country").find("[data-ref='"+ response[0].country_id +"']").attr('selected', true);
        $("#select_city").find("[data-ref='"+ response[0].city_id +"']").attr('selected', true);
        address_newContact.value = response[0].address
        $("#select_interest").find("[data-ref='"+ response[0].interests+"']").attr('selected', true);

        $("#select_company").find("[data-ref='"+ response[0].company_id +"']").attr('selected', true);
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

if (id_contact_to_edit !== "") {
    old_contact_show();
}

/*------------------------------------*/
/*     edit old contact function     */
/*-----------------------------------*/
function update_old_contact () {
    console.log("lalak;aks")
    let companyId_jquery = $("#select_company option:selected").attr("data-ref");
    let cityId_jquery = $("#select_city option:selected").attr("data-ref");
    let interestId_jquery = $("#select_interest option:selected").attr("data-ref");
    fetch('http://localhost:3001/contacts/'+ id_contact_to_edit, {
        method: 'PUT',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': name_newContact.value, 
            'lastname': lastname_newContact.value,
            'email': email_newContact.value,
            'company_id': companyId_jquery, 
            'city_id': cityId_jquery, 
            'address': address_newContact.value,  
            'profile': profile_newContact.value,  
            'interests': interestId_jquery
        })
    })
    //.then (response => response.json())//este json era un problema, enviaba datos undefined
    .then (response => {
        location.href = '../contacts.html'
    })
    .catch (error => console.log("error al crear usuario" + error) )
}

/*---------------------------------*/
/*     create or edit contacts     */
/*---------------------------------*/
save_newContact.addEventListener("click", () => {
    if(id_contact_to_edit === "") {
        console.log("soy nuevo")
        create_new_contact();
    } else {
        console.log("soy viejo")
        update_old_contact()
    }
});

