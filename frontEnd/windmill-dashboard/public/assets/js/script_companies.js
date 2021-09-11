//companies
let check_box_general_companies = document.getElementById("check_box_general_companies");
let check_box_company = document.getElementById("check_box_company");
let add_company = document.getElementById("add_company");
let edit_company = document.getElementById("edit_company");
let delete_company = document.getElementById("delete_company");

let token = localStorage.getItem("sesionToken")

/*------------------------------------*/
/*       presentation of companies     */
/*------------------------------------*/
getCompanies()
function getCompanies () {
    fetch('http://localhost:3001/companies', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        })
    })
    .then (response => response.json())
    .then (response => {
        console.log(response)
        response.forEach(company => {
            console.log(company)
            //child of tbody
            const tr_company = document.createElement("tr");//
            tr_company.setAttribute("class", "text-gray-700 dark:text-gray-400");//
    //1 td. child of tr_company
            const td_company = document.createElement("td");//
            td_company.setAttribute("class", "px-4 py-3 text-sm");//
        //1.1. div child of td_company
            const div_check_box = document.createElement("div");
            div_check_box.setAttribute("id", "check_box_company"); 
            div_check_box.setAttribute("class", "custom-control custom-checkbox"); 
            //1.1.1. input child of div_check_box
            const input_child_check_box = document.createElement("input");
            input_child_check_box.setAttribute("type", "checkbox");
            input_child_check_box.setAttribute("class", "custom-control-input");
            input_child_check_box.setAttribute("id", "customCheck_" + company.company_id);
            //1.1.2. label child of div_check_box
            const label_child_check_box = document.createElement("label");
            label_child_check_box.setAttribute("class", "custom-control-label");
            label_child_check_box.setAttribute("for", "customCheck_" + company.company_id);
            
    //2 td. child of tr_company
            const td_name = document.createElement("td");//
            td_name.setAttribute("class", "px-4 py-3");//
            //2.1. div child of td_img_name_email
            const p_child_td = document.createElement("p");
            p_child_td.setAttribute("class", "font-semibold");
            p_child_td.textContent = company.name
    
    //3 td. child of tr_company, also sibling of td_company and td_img_name_email
            const td_country = document.createElement("td");
            td_country.setAttribute("class", "px-4 py-3 text-sm");
            td_country.textContent = company.country
            //3.1 child of td_country
            const p_region = document.createElement("p");
            p_region.setAttribute("class", "text-xs text-gray-600 dark:text-gray-400");            
            p_region.textContent = company.region

    //4 td.child of tr_company, also sibling of td_company, td_img_name_email and td_country_city
            const td_city = document.createElement("td");
            td_city.setAttribute("class", "px-4 py-3 text-xs");
            //4.1. span
            const span_city = document.createElement("span");
            span_city.setAttribute("class", "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100");
            span_city.textContent = company.city
            
    //5 td. child of tr_company, also sibling of td_company, td_img_name_email, td_country_city and td_company
            const td_address = document.createElement("td");
            td_address.setAttribute("class", "px-4 py-3 text-sm");
            td_address.textContent = company.address
            
    //6 td. child of tr_company, also sibling of td_company, td_img_name_email, td_country_city, td_company and td_profile
            const td_email = document.createElement("td");
            td_email.setAttribute("class", "px-4 py-3 text-sm");
            td_email.textContent = company.email
    
    //7 td. child of tr_company, also sibling of td_company, td_img_name_email, td_country_city, td_company and td_profile
            const td_telephone = document.createElement("td");
            td_telephone.setAttribute("class", "px-4 py-3 text-sm");
            td_telephone.textContent = company.telephone
    
    //8 td. child of tr_company, also sibling of td_company, td_img_name_email, td_country_city, td_company, td_profile and td_interest
            const td_actions = document.createElement("td");
            td_actions.setAttribute("class", "px-4 py-3 text-sm");
            //7.1. div child of td_actions
            const div_actions = document.createElement("div");
            div_actions.setAttribute("class", "flex items-center text-smm");
        //7.1.1 div child of div_actions
            const div_actions_edit = document.createElement("div");
            div_actions_edit.setAttribute("id", "edit_company");
            div_actions_edit.setAttribute("class", "relative hidden w-8 h-8 mr-3 rounded-full md:block");
           //7.1.1.1. a child of div_actions_edit
            const a_child_edit = document.createElement("a");
            //7.1.1.1.1. btn child of a_child_edit
            const btn_child_edit = document.createElement("button");
            //7.1.1.1.1.1. img child of btn_child_edit
            const img_edit = document.createElement("img");
            img_edit.setAttribute("class", "object-cover w-full h-full rounded-full");
            img_edit.setAttribute("src", "../public/assets/img/icons8-edit-24-white.png");
            
        //7.1.2. div child of div_actions
            const div_actions_trash = document.createElement("div");
            div_actions_trash.setAttribute("id", "delete_company");
            div_actions_trash.setAttribute("class", "relative hidden w-8 h-8 mr-3 rounded-full md:block");
            //7.1.2.1. a child of div_action_trash
            const a_child_trash = document.createElement("a");
            //7.1.2.1.1. btn child of a_child_trash
            const btn_child_trash = document.createElement("button");
            //7.1.2.1.1.1. img child of btn_child_trash
            const img_trash = document.createElement("img");
            img_trash.setAttribute("class", "object-cover w-full h-full rounded-full");
            img_trash.setAttribute("src", "../public/assets/img/icons8-delete-64-white.png");
            
            document.querySelector("#container_companies").appendChild(tr_company);
            //1.
            tr_company.appendChild(td_company);
            td_company.appendChild(div_check_box);
            div_check_box.appendChild(input_child_check_box);
            div_check_box.appendChild(label_child_check_box);

            //2.
            tr_company.appendChild(td_name);
            td_name.appendChild(p_child_td);
            
            //3.
            tr_company.appendChild(td_country);
            td_country.appendChild(p_region);
            //4.
            tr_company.appendChild(td_city);
            td_city.appendChild(span_city);
            //5.
            tr_company.appendChild(td_address);
            tr_company.appendChild(td_email);
            tr_company.appendChild(td_telephone);

            tr_company.appendChild(td_actions);
            td_actions.appendChild(div_actions);
            div_actions.appendChild(div_actions_edit);
            div_actions_edit.appendChild(a_child_edit);
            a_child_edit.appendChild(btn_child_edit);
            btn_child_edit.appendChild(img_edit);
            div_actions.appendChild(div_actions_trash);
            div_actions_trash.appendChild(a_child_trash);
            a_child_trash.appendChild(btn_child_trash);
            btn_child_trash.appendChild(img_trash);
                       

            /*------------------------*/
            /*     select a company   */
            /*------------------------*/
            let check_box_company = document.getElementById("customCheck_" + company.company_id);
            check_box_company.addEventListener("click", () =>{
                btn_delete_companies.classList.remove("off")
                btn_delete_companies.classList.add("on")  
            })

            /*-----------------------------------*/
            /*     delete a company by actions   */
            /*-----------------------------------*/
            btn_child_trash.addEventListener("click", () =>{
                let id_company_to_delete = company.company_id

                fetch('http://localhost:3001/companies/'+ id_company_to_delete, {
                method: 'DELETE',
                headers: new Headers ({
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }) 
                })
                .then (response => {
                    response.json()
                    location.reload()
                })
                .catch (error => console.log('No puede eliminar la compañia ' + error))
                })
        })        
    })
}