//regions and cities
let btn_add_region = document.getElementById("btn_add_region");
let btn_add_country = document.getElementById("btn_add_country");
let btn_add_city = document.getElementById("btn_add_city");
let btn_edit_country = document.getElementById("btn_edit_country");
let btn_delete_country = document.getElementById("btn_delete_country");
let btn_edit_city = document.getElementById("btn_edit_city");
let btn_delete_city = document.getElementById("btn_delete_city");

let token = localStorage.getItem("sesionToken")

function showUsersPage()
{
    fetch("http://localhost:3001/users/isAdmin", {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        })
    })
    .then (response => response.json())
    .then (response => {
        console.log("hi");
        console.log(response);
        if (response === false){
            $("#userPage").remove();
        }   
    })
}
showUsersPage()

/*-----------------------------*/
/*       registered regions    */
/*-----------------------------*/
get_regions()
function get_regions () {
    fetch('http://localhost:3001/regions', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        })
    })
    .then (response => response.json())
    .then (response => {
        response.forEach(region => {
            const main = document.createElement("main")
            main.setAttribute("id", "region_" + region.region_id);
            main.setAttribute("class", "h-full pb-16");
        //1. child of main
            const div_region = document.createElement("div");
            div_region.setAttribute("class", "position_box_region px-6 mx-auto");
            //1.1. child of div_region
            const div_one_region = document.createElement("div");
            div_one_region.setAttribute("class", "position_box_region px-6 mx-auto without_margin_left");
            //1.1.1. child of div_one
            const div_two_region = document.createElement("div");
            div_two_region.setAttribute("class", "position_box_region overflow-hidden rounded-lg shadow-xs");
            //1.1.1.1. child of div_two
            const div_three_region = document.createElement("div");
            div_three_region.setAttribute("class", "pos_add position_box_region overflow-x-auto");
            
            //1.1.1.1.1. child of div_three_region
            const div_four_region = document.createElement("div");
            div_four_region.setAttribute("class", "position_add");
            //A. child of div_four_region
            const a_one_region = document.createElement("a");
            a_one_region.setAttribute("class", "px-6");
            //A.1. child of a_one_region
            const btn_one_region = document.createElement("button");
            btn_one_region.setAttribute("id", "btn_add_country_" + region.region_id);//ubicar id de la region
            btn_one_region.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
            btn_one_region.textContent = "Agregar País"
            /*   Add   */
            btn_one_region.addEventListener("click", () => {
                let regionId = region.region_id;
                localStorage.setItem("key_add_country", regionId)                    
                window.location.href = './pages/addCountry.html'
            })
           
            //1.1.1.1.2. child of div_three_region
            const table_one_region = document.createElement("table");
            table_one_region.setAttribute("class", "whitespace-no-wrap");
            //A. child of table_one_region
            const tbody_one_region = document.createElement("tbody");
            //A.1. child of tbody_one_region
            const tr_one_region = document.createElement("tr");
            tr_one_region.setAttribute("class", "center_second_box text-gray-700 dark:text-gray-400");
            //A.1.1. child of tr_one_region
            const td_one_region = document.createElement("td");
            td_one_region.setAttribute("class", "px-4 py-3 text-sm");
            //A.1.1.1. child of td_one_region
            const p_one_region = document.createElement("p");
            p_one_region.setAttribute("class", "font-semibold");
            p_one_region.textContent = region.name
            
            document.querySelector("#container_regions").appendChild(main);

            main.appendChild(div_region);
            div_region.appendChild(div_one_region);
            div_one_region.appendChild(div_two_region);
            div_two_region.appendChild(div_three_region);   
            div_three_region.appendChild(div_four_region);
            div_four_region.appendChild(a_one_region);
            a_one_region.appendChild(btn_one_region);

            div_three_region.appendChild(table_one_region);
            table_one_region.appendChild(tbody_one_region);
            tbody_one_region.appendChild(tr_one_region);
            tr_one_region.appendChild(td_one_region);
            td_one_region.appendChild(p_one_region);
        })        
    })
}

/*--------------------------------*/
/*       registered countries     */
/*--------------------------------*/
get_countries()
function get_countries () {
    fetch('http://localhost:3001/countries', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        })
    })
    .then (response => response.json())
    .then (response => {
        response.forEach(country => {                    
        //2. child of main
            const div_country = document.createElement("div");
            div_country.setAttribute("id", "country_" + country.country_id);
            div_country.setAttribute("class", "position_box_region px-6 mx-auto p-country");
            //2.1. child of div_country
            const div_one_country = document.createElement("div");
            div_one_country.setAttribute("class", "position_box_region px-6 mx-auto without_margin_left");
            //2.1.1. child of div_one
            const div_two_country = document.createElement("div");
            div_two_country.setAttribute("class", "position_box_region overflow-hidden rounded-lg shadow-xs");
            //2.1.1.1. child of div_two
            const div_three_country = document.createElement("div");
            div_three_country.setAttribute("class", "pos_add position_box_region overflow-x-auto");
                
            //----2.1.1.1.1. child of div_three_country
            const div_four_country = document.createElement("div");
            div_four_country.setAttribute("class", "position_add");
            //A. child of div_four_country
            const a_one_country = document.createElement("a");
            a_one_country.setAttribute("class", "px-6");
            //A.1. child of a_one_country
            const btn_one_country = document.createElement("button");
            btn_one_country.setAttribute("id", "btn_add_country_" + country.country_id);//ubicar id de la region
            btn_one_country.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
            btn_one_country.textContent = "Agregar Ciudad"
            /*   Add   */
            btn_one_country.addEventListener("click", () => {
                let countryId = country.country_id;
                localStorage.setItem("key_add_city", countryId)                    
                window.location.href = './pages/addCity.html'
            })
            
            //-----2.1.1.1.2. child of div_three_country
            const div_five_country = document.createElement("div");
            div_five_country.setAttribute("class", "position_add");
            //A. child of div_five_country
            const a_two_country = document.createElement("a");
            a_two_country.setAttribute("class", "px-6");
            //A.1. child of a_one_country
            const btn_two_country = document.createElement("button");
            btn_two_country.setAttribute("id", "btn_delete_country");
            btn_two_country.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
            btn_two_country.textContent = "Eliminar"
            /*   Delete   */
            btn_two_country.addEventListener("click", () => {
                let countryId = country.country_id;
                let confi_True_False = confirm("¿Seguro que desea eliminar el País seleccionado?");      
                if (confi_True_False === true) {
                    fetch('http://localhost:3001/countries/'+ countryId, {
                        method: 'DELETE',
                        headers: new Headers ({
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        }) 
                    })
                    .then (response => {    
                        location.reload();
                    })
                    .catch (error => console.log('No puede eliminar el País ' + error))
                } else {
                    location.reload();
                }
            })

            //-----2.1.1.1.3. child of div_three_country
            const div_six_country = document.createElement("div");
            //A. child of div_six_country
            const a_three_country = document.createElement("a");
            a_three_country.setAttribute("class", "px-6");
            //A.1. child of a_three_country
            const btn_three_country = document.createElement("button");
            btn_three_country.setAttribute("id", "btn_edit_country");
            btn_three_country.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
            btn_three_country.textContent = "Editar"
            /*  Edit   */
            btn_three_country.addEventListener("click", () => {
                let countryId = country.country_id;
                localStorage.setItem("key_edit_country", countryId)                    
                window.location.href = '../public/pages/addCountry.html'
            })

            //-----2.1.1.1.4. child of div_three_region
            const table_one_country = document.createElement("table");
            table_one_country.setAttribute("class", "whitespace-no-wrap");
            //A. child of table_one_region
            const tbody_one_country = document.createElement("tbody");
            //A.1. child of tbody_one_country
            const tr_one_country = document.createElement("tr");
            tr_one_country.setAttribute("class", "center_second_box text-gray-700 dark:text-gray-400");
            //A.1.1. child of tr_one_country
            const td_one_country = document.createElement("td");
            td_one_country.setAttribute("class", "px-4 py-3 text-sm");
            //A.1.1.1. child of td_one_country
            const p_one_country = document.createElement("p");
            p_one_country.setAttribute("class", "font-semibold");
            p_one_country.textContent = country.name
                          
            document.querySelector("#region_" + country.region_id).appendChild(div_country);

            div_country.appendChild(div_one_country);
            div_one_country.appendChild(div_two_country);
            div_two_country.appendChild(div_three_country); 

            div_three_country.appendChild(div_four_country);
            div_four_country.appendChild(a_one_country);
            a_one_country.appendChild(btn_one_country);

            div_three_country.appendChild(div_five_country);
            div_five_country.appendChild(a_two_country);
            a_two_country.appendChild(btn_two_country);

            div_three_country.appendChild(div_six_country);
            div_six_country.appendChild(a_three_country);
            a_three_country.appendChild(btn_three_country);

            div_three_country.appendChild(table_one_country);
            table_one_country.appendChild(tbody_one_country);
            tbody_one_country.appendChild(tr_one_country);
            tr_one_country.appendChild(td_one_country);
            td_one_country.appendChild(p_one_country);
            
        })        
    })
}

/*-----------------------------*/
/*       registered cities     */
/*-----------------------------*/
get_cities()
function get_cities () {
    fetch('http://localhost:3001/cities', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        })
    })
    .then (response => response.json())
    .then (response => {
        response.forEach(city => {
        //3. child of main
            const div_city = document.createElement("div");
            div_city.setAttribute("class", "position_box_region px-6 mx-auto p-city");
            //3.1. child of div_city
            const div_one_city = document.createElement("div");
            div_one_city.setAttribute("class", "position_box_region px-6 mx-auto without_margin_left");
            //3.1.1. child of div_one
            const div_two_city = document.createElement("div");
            div_two_city.setAttribute("class", "position_box_region overflow-hidden rounded-lg shadow-xs");
            //3.1.1.1. child of div_two
            const div_three_city = document.createElement("div");
            div_three_city.setAttribute("class", "pos_add position_box_region overflow-x-auto");
            
            //3.A. child of div_three_city
            const div_four_city = document.createElement("div");
            div_four_city.setAttribute("class", "position_add");
            //3.A.1. child of div_four_city
            const a_one_city = document.createElement("a");
            a_one_city.setAttribute("class", "px-6");
            //3.A.1.1. child of a_one_city
            const btn_one_city = document.createElement("button");
            btn_one_city.setAttribute("id", "btn_delete_city");
            btn_one_city.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
            btn_one_city.textContent = "Eliminar"
            /*   Delete   */
            btn_one_city.addEventListener("click", () => {
                let cityId = city.city_id;
                let confi_True_False = confirm("¿Seguro que desea eliminar la Ciudad seleccionada?");      
                if (confi_True_False === true) {
                    fetch('http://localhost:3001/cities/'+ cityId, {
                        method: 'DELETE',
                        headers: new Headers ({
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        }) 
                    })
                    .then (response => {    
                        location.reload();
                    })
                    .catch (error => console.log('No puede eliminar la Ciudad ' + error))
                } else {
                    location.reload();
                }
            })
            
            //3.B. child of div_three_city
            const div_five_city = document.createElement("div");
            //3.B.1. child of div_five_city
            const a_two_city = document.createElement("a");
            a_two_city.setAttribute("class", "px-6");
            //3.B.1.1. child of a_one_city
            const btn_two_city = document.createElement("button");
            btn_two_city.setAttribute("id", "btn_edit_city");
            btn_two_city.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
            btn_two_city.textContent = "Editar"
            /*  Edit   */
            btn_two_city.addEventListener("click", () =>{
                let cityId = city.city_id;
                localStorage.setItem("key_to_edit", cityId)                    
                window.location.href = '../public/pages/addCity.html'
            })
            
            //3.C. child of div_three_city
            const table_one_city = document.createElement("table");
            table_one_city.setAttribute("class", "whitespace-no-wrap");
            //3.C.1. child of table_one_city
            const tbody_one_city = document.createElement("tbody");
            //3.C.1.1. child of tbody_one_city
            const tr_one_city = document.createElement("tr");
            tr_one_city.setAttribute("class", "center_second_box text-gray-700 dark:text-gray-400");
            //3.C.1.1.1. child of tr_one_city
            const td_one_city = document.createElement("td");
            td_one_city.setAttribute("class", "px-4 py-3 text-sm");
            //3.C.1.1.1.1. child of td_one_city
            const p_one_city = document.createElement("p");
            p_one_city.setAttribute("class", "font-semibold");
            p_one_city.textContent = city.name
                                    
            document.querySelector("#country_" + city.country_id).after(div_city);

            div_city.appendChild(div_one_city);
            div_one_city.appendChild(div_two_city);
            div_two_city.appendChild(div_three_city);   
            div_three_city.appendChild(div_four_city);
            div_four_city.appendChild(a_one_city);
            div_four_city.appendChild(btn_one_city);
            
            div_three_city.appendChild(div_five_city);
            div_five_city.appendChild(a_two_city);
            a_two_city.appendChild(btn_two_city);
            
            div_three_city.appendChild(table_one_city);
            table_one_city.appendChild(tbody_one_city);
            tbody_one_city.appendChild(tr_one_city);
            tr_one_city.appendChild(td_one_city);
            td_one_city.appendChild(p_one_city);
            
        })        
    })
}