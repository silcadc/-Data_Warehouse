let input_new_country = document.getElementById("input_new_country");
let btn_add_new_country = document.getElementById("add_new_country");
let cancel_new_country = document.getElementById("cancel_new_region");

let token = localStorage.getItem("sesionToken");

let region_id_country = localStorage.getItem("key_add_country");
localStorage.setItem("key_add_country", "");

let key_edit_country = localStorage.getItem("key_edit_country");
localStorage.setItem("key_edit_country", "");

function add_new_country () {
    fetch('http://localhost:3001/countries', {
        method: 'POST',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': input_new_country.value,
            'region_id': region_id_country
        })
    })
    .then (response => { 
        location.href = '../regions.html'
    })
    .catch (error => console.log("error al agregar un País" + error) )
}

/*----------------------------------*/
/*     performans by old country    */
/*----------------------------------*/
function old_country_show () {
    fetch('http://localhost:3001/countries/'+ key_edit_country, {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        input_new_country.value = response[0].name
    })
    .catch (error => console.log('No puede editar el País ' + error))
}
if (key_edit_country !== "") {
    old_country_show();
}

/*---------------------------------*/
/*     edit old city function     */
/*---------------------------------*/
function update_old_country () {
    fetch('http://localhost:3001/countries/'+ key_edit_country, {
        method: 'PATCH',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': input_new_country.value
        })
    })
    .then (response => {
        location.href = '../regions.html'
    })
    .catch (error => console.log("error al editar el País " + error) )
}

/*------------------------------*/
/*     create or edit cities    */
/*------------------------------*/
btn_add_new_country.addEventListener("click", () => {
    if(key_edit_country === "") {
        add_new_country();
    } else {
        update_old_country()
    }
});