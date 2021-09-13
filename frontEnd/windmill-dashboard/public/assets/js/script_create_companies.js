let name_new_company = document.getElementById("name_input_new_company");
let region_new_company = document.getElementById("region_input_new_company");
let country_new_company = document.getElementById("country_input_new_company");
let city_new_company = document.getElementById("city_input_new_company");
let address_new_company = document.getElementById("address_input_new_company");
let email_new_company = document.getElementById("email_input_new_company");
let telephone_new_company = document.getElementById("telephone_input_new_company");

let add_new_company = document.getElementById("add_new_company");
let btn_cancel_company = document.getElementById("btn_cancel_company");

let token = localStorage.getItem("sesionToken")

/*----------------------------*/
/*     create new company     */
/*----------------------------*/
function add_newCompany () {
    let cityId_jquery_company = $("#city_new_company option:selected").attr("data-ref");

    fetch('http://localhost:3001/companies', {
        method: 'POST',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': name_new_company.value, 
            'telephone': telephone_new_company.value, 
            'email': email_new_company.value, 
            'city_id': cityId_jquery_company,  
            'address': address_new_company.value
        })
    })
    //.then (response => response.json())este json era un problema, enviaba datos undefined
    .then (response => { 
        console.log(response)
        location.href = '../companies.html'
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
            document.querySelector("#region_new_company").appendChild(optionTag);
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
            optionTag.setAttribute("data-ref", country.country_id);//
            optionTag.setAttribute("data-belong", country.region_id);//
            optionTag.textContent =  country.name
            document.querySelector("#country_new_company").appendChild(optionTag);
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
            optionTag.setAttribute("data-ref", city.city_id);//
            optionTag.setAttribute("data-belong", city.country_id);//
            optionTag.textContent =  city.name
            document.querySelector("#city_new_company").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

load_region()
load_country()
load_city()

add_new_company.addEventListener("click", () => {
    add_newCompany();
})