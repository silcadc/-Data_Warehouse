let input_new_city = document.getElementById("input_new_city");
let btn_add_new_city = document.getElementById("add_new_city");
let cancel_new_city = document.getElementById("cancel_new_region");

let token = localStorage.getItem("sesionToken");

let region_id_city = localStorage.getItem("key_add_city");
localStorage.setItem("key_add_city", "");

let edit_id_city = localStorage.getItem("key_to_edit");
localStorage.setItem("key_to_edit", "");

function add_new_city () {
    fetch('http://localhost:3001/cities', {
        method: 'POST',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': input_new_city.value,
            'country_id': region_id_city
        })
    })
    .then (response => { 
        location.href = '../regions.html'
    })
    .catch (error => console.log("error al agregar una Ciudad" + error) )
};

/*-------------------------------*/
/*     performans by old city    */
/*--------------------------------*/
function old_city_show () {
    fetch('http://localhost:3001/cities/'+ edit_id_city, {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        input_new_city.value = response[0].name
    })
    .catch (error => console.log('No puede editar la ciudad ' + error))
}
if (edit_id_city !== "") {
    old_city_show();
}

/*---------------------------------*/
/*     edit old city function     */
/*---------------------------------*/
function update_old_city () {
    fetch('http://localhost:3001/cities/'+ edit_id_city, {
        method: 'PATCH',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': input_new_city.value
        })
    })
    .then (response => {
        location.href = '../regions.html'
    })
    .catch (error => console.log("error al editar la ciudad" + error) )
}

/*------------------------------*/
/*     create or edit cities    */
/*------------------------------*/
btn_add_new_city.addEventListener("click", () => {
    if(edit_id_city === "") {
        add_new_city();
    } else {
        update_old_city()
    }
});

