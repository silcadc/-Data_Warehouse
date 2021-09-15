let name_newCompany = document.getElementById("name_input_new_company");
let address_newCompany = document.getElementById("address_input_new_company");
let email_newCompany = document.getElementById("email_input_new_company");
let telephone_newCompany = document.getElementById("telephone_input_new_company");

let add_new_company = document.getElementById("add_new_company");
let btn_cancel_company = document.getElementById("btn_cancel_company");

let token = localStorage.getItem("sesionToken");
let id_company_to_edit = localStorage.getItem("key_to_edit");
localStorage.setItem("key_to_edit", "");

/*----------------------------*/
/*     create new company     */
/*----------------------------*/
function add_newCompany () {
    let cityId_jquery_company = $("#select_city_company option:selected").attr("data-ref");
    fetch('http://localhost:3001/companies', {
        method: 'POST',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': name_newCompany.value, 
            'telephone': telephone_newCompany.value, 
            'email': email_newCompany.value, 
            'city_id': cityId_jquery_company,  
            'address': address_newCompany.value
        })
    })
    .then (response => {
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
            document.querySelector("#select_region_company").appendChild(optionTag);
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
            document.querySelector("#select_country_company").appendChild(optionTag);
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
            document.querySelector("#select_city_company").appendChild(optionTag);
        });
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

load_region();
load_country();
load_city();

/*-----------------------------------*/
/*     performans by old company     */
/*-----------------------------------*/
function old_company_show () {
    fetch('http://localhost:3001/companies/'+ id_company_to_edit, {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        name_newCompany.value = response[0].name
        $("#select_region_company").find("[data-ref='"+ response[0].region_id +"']").attr('selected', true);
        $("#select_country_company").find("[data-ref='"+ response[0].country_id +"']").attr('selected', true);
        $("#select_city_company").find("[data-ref='"+ response[0].city_id +"']").attr('selected', true);
        address_newCompany.value = response[0].address
        email_newCompany.value = response[0].email 
        telephone_newCompany.value = response[0].telephone 
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
};

if (id_company_to_edit !== "") {
    old_company_show();
};

/*------------------------------------*/
/*     edit old company function     */
/*-----------------------------------*/
function update_old_company () {
    let cityId_jquery = $("#select_city_company option:selected").attr("data-ref");
    fetch('http://localhost:3001/companies/'+ id_company_to_edit, {
        method: 'PUT',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': name_newCompany.value, 
            'city_id': cityId_jquery, 
            'address': address_newCompany.value,  
            'email': email_newCompany.value,
            'telephone': telephone_newCompany.value
        })
    })
    .then (response => {
        location.href = '../companies.html'
    })
    .catch (error => console.log("error al crear usuario" + error) )
};

/*----------------------------------*/
/*     create or edit companies     */
/*----------------------------------*/
add_new_company.addEventListener("click", () => {
    if(id_company_to_edit === "") {
        add_newCompany();
    } else {
        update_old_company()
    }
});