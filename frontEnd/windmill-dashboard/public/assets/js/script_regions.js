//regions and cities
let btn_add_region = document.getElementById("btn_add_region");
let btn_add_country = document.getElementById("btn_add_country");
let btn_add_city = document.getElementById("btn_add_city");
let btn_edit_country = document.getElementById("btn_edit_country");
let btn_delete_country = document.getElementById("btn_delete_country");
let btn_edit_city = document.getElementById("btn_edit_city");
let btn_delete_city = document.getElementById("btn_delete_city");

let token = localStorage.getItem("sesionToken")

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
        console.log(response)
        response.forEach(region => {
            console.log(region)
            const main = document.createElement("main")
            main.setAttribute("class", "h-full pb-16 overflow-y-auto");
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
            a_one_region.setAttribute("href", "./regions.html");
            //A.1. child of a_one_region
            const btn_one_region = document.createElement("button");
            btn_one_region.setAttribute("id", "btn_add_country_" + region.region_id);//ubicar id de la region
            btn_one_region.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
            btn_one_region.textContent = "Agregar País"
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

        
        
        //2. child of main
        //     const div_country = document.createElement("div");
        //     div_country.setAttribute("class", "position_box_region px-6 mx-auto");
        //     //2.1. child of div_country
        //     const div_one_country = document.createElement("div");
        //     div_one_country.setAttribute("class", "position_box_region px-6 mx-auto without_margin_left");
        //     //2.1.1. child of div_one
        //     const div_two_country = document.createElement("div");
        //     div_two_country.setAttribute("class", "position_box_region overflow-hidden rounded-lg shadow-xs");
        //     //2.1.1.1. child of div_two
        //     const div_three_country = document.createElement("div");
        //     div_three_country.setAttribute("class", "pos_add position_box_region overflow-x-auto");
        //         //2.1.1.1.1. child of div_three_country
        //     const div_four_country = document.createElement("div");
        //     div_four_country.setAttribute("class", "position_add");
        //     //A. child of div_four_country
        //     const a_one_country = document.createElement("a");
        //     a_one_country.setAttribute("class", "px-6");
        //     a_one_country.setAttribute("href", "./regions.html");
        //     //A.1. child of div_four_region
        //     const btn_one_country = document.createElement("button");
        //     btn_one_country.setAttribute("id", "btn_add_country_" + region.region_id);//ubicar id de la region
        //     btn_one_country.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
        //     btn_one_country.textContent = "Agregar País"
        //         //2.1.1.1.2. child of div_three_region
        //     const table_one_country = document.createElement("table");
        //     table_one_country.setAttribute("class", "whitespace-no-wrap");
        //     //A. child of table_one_region
        //     const tbody_one_country = document.createElement("tbody");
        //     //A.1. child of tbody_one_country
        //     const tr_one_country = document.createElement("tr");
        //     tr_one_country.setAttribute("class", "center_second_box text-gray-700 dark:text-gray-400");
        //     //A.1.1. child of tr_one_country
        //     const td_one_country = document.createElement("td");
        //     td_one_country.setAttribute("class", "px-4 py-3 text-sm");
        //     //A.1.1.1. child of td_one_country
        //     const p_one_country = document.createElement("p");
        //     p_one_country.setAttribute("class", "font-semibold");
        //     p_one_country.textContent = region.name

            

        // //3. child of main
        //     const div_city = document.createElement("div");
        //     div_city.setAttribute("class", "position_box_region px-6 mx-auto");
        //     //3.1. child of div_city
        //     const div_one_city = document.createElement("div");
        //     div_one_city.setAttribute("class", "position_box_region px-6 mx-auto without_margin_left");
        //     //3.1.1. child of div_one
        //     const div_two_city = document.createElement("div");
        //     div_two_city.setAttribute("class", "position_box_region overflow-hidden rounded-lg shadow-xs");
        //     //3.1.1.1. child of div_two
        //     const div_three_city = document.createElement("div");
        //     div_three_city.setAttribute("class", "pos_add position_box_region overflow-x-auto");
        //     //3.1.1.1.1. child of div_three
        //     const div_four_city = document.createElement("div");
        //     div_four_city.setAttribute("class", "position_add");
        //     const table_one_city = document.createElement("table");
        //     table_one_city.setAttribute("class", "whitespace-no-wrap");
            
            
                        
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


            // main.appendChild(div_country);
            // div_country.appendChild(div_one_country);
            // div_one_country.appendChild(div_two_country);
            // div_two_country.appendChild(div_three_country);   
            // div_three_country.appendChild(div_four_country);
            // div_three_country.appendChild(table_one_country);
            
            // main.appendChild(div_city);
            // div_city.appendChild(div_one_city);
            // div_one_city.appendChild(div_two_city);
            // div_two_city.appendChild(div_three_city);   
            // div_three_city.appendChild(div_four_city);
            // div_three_city.appendChild(table_one_city);
    
            
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
        console.log(response)
        response.forEach(country => {
            console.log(country)
            const main = document.createElement("main")
            main.setAttribute("class", "h-full pb-16 overflow-y-auto");
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
            a_one_region.setAttribute("href", "./regions.html");
            //A.1. child of a_one_region
            const btn_one_region = document.createElement("button");
            btn_one_region.setAttribute("id", "btn_add_country_" + region.region_id);//ubicar id de la region
            btn_one_region.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
            btn_one_region.textContent = "Agregar País"
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

        
        
        //2. child of main
        //     const div_country = document.createElement("div");
        //     div_country.setAttribute("class", "position_box_region px-6 mx-auto");
        //     //2.1. child of div_country
        //     const div_one_country = document.createElement("div");
        //     div_one_country.setAttribute("class", "position_box_region px-6 mx-auto without_margin_left");
        //     //2.1.1. child of div_one
        //     const div_two_country = document.createElement("div");
        //     div_two_country.setAttribute("class", "position_box_region overflow-hidden rounded-lg shadow-xs");
        //     //2.1.1.1. child of div_two
        //     const div_three_country = document.createElement("div");
        //     div_three_country.setAttribute("class", "pos_add position_box_region overflow-x-auto");
        //         //2.1.1.1.1. child of div_three_country
        //     const div_four_country = document.createElement("div");
        //     div_four_country.setAttribute("class", "position_add");
        //     //A. child of div_four_country
        //     const a_one_country = document.createElement("a");
        //     a_one_country.setAttribute("class", "px-6");
        //     a_one_country.setAttribute("href", "./regions.html");
        //     //A.1. child of div_four_region
        //     const btn_one_country = document.createElement("button");
        //     btn_one_country.setAttribute("id", "btn_add_country_" + region.region_id);//ubicar id de la region
        //     btn_one_country.setAttribute("class", "items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple");
        //     btn_one_country.textContent = "Agregar País"
        //         //2.1.1.1.2. child of div_three_region
        //     const table_one_country = document.createElement("table");
        //     table_one_country.setAttribute("class", "whitespace-no-wrap");
        //     //A. child of table_one_region
        //     const tbody_one_country = document.createElement("tbody");
        //     //A.1. child of tbody_one_country
        //     const tr_one_country = document.createElement("tr");
        //     tr_one_country.setAttribute("class", "center_second_box text-gray-700 dark:text-gray-400");
        //     //A.1.1. child of tr_one_country
        //     const td_one_country = document.createElement("td");
        //     td_one_country.setAttribute("class", "px-4 py-3 text-sm");
        //     //A.1.1.1. child of td_one_country
        //     const p_one_country = document.createElement("p");
        //     p_one_country.setAttribute("class", "font-semibold");
        //     p_one_country.textContent = region.name

            

        // //3. child of main
        //     const div_city = document.createElement("div");
        //     div_city.setAttribute("class", "position_box_region px-6 mx-auto");
        //     //3.1. child of div_city
        //     const div_one_city = document.createElement("div");
        //     div_one_city.setAttribute("class", "position_box_region px-6 mx-auto without_margin_left");
        //     //3.1.1. child of div_one
        //     const div_two_city = document.createElement("div");
        //     div_two_city.setAttribute("class", "position_box_region overflow-hidden rounded-lg shadow-xs");
        //     //3.1.1.1. child of div_two
        //     const div_three_city = document.createElement("div");
        //     div_three_city.setAttribute("class", "pos_add position_box_region overflow-x-auto");
        //     //3.1.1.1.1. child of div_three
        //     const div_four_city = document.createElement("div");
        //     div_four_city.setAttribute("class", "position_add");
        //     const table_one_city = document.createElement("table");
        //     table_one_city.setAttribute("class", "whitespace-no-wrap");
            
            
                        
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


            // main.appendChild(div_country);
            // div_country.appendChild(div_one_country);
            // div_one_country.appendChild(div_two_country);
            // div_two_country.appendChild(div_three_country);   
            // div_three_country.appendChild(div_four_country);
            // div_three_country.appendChild(table_one_country);
            
            // main.appendChild(div_city);
            // div_city.appendChild(div_one_city);
            // div_one_city.appendChild(div_two_city);
            // div_two_city.appendChild(div_three_city);   
            // div_three_city.appendChild(div_four_city);
            // div_three_city.appendChild(table_one_city);
    
            
        })        
    })
}
