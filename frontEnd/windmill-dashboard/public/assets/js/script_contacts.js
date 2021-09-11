//section contact
let search_input_contact = document.getElementById("search_input_contact");
let check_box_contacts_general = document.getElementById("check_box_contacts_general");
let check_box_contact = document.getElementById("check_box_contact");
let edit_contact = document.getElementById("edit_contact");
let delete_contact = document.getElementById("delete_contact");

let token = localStorage.getItem("sesionToken")

/*------------------------------------*/
/*       presentation of contacts     */
/*------------------------------------*/
getContacts()
function getContacts () {
    fetch('http://localhost:3001/contacts', {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        })
    })
    .then (response => response.json())
    .then (response => {
        console.log(response)
        response.forEach(contact => {
            console.log(contact)
            //child of tbody
            const tr_contact = document.createElement("tr");//
            tr_contact.setAttribute("class", "text-gray-700 dark:text-gray-400");//
    //1 td. child of tr_contact
            const td_contact = document.createElement("td");//
            td_contact.setAttribute("class", "px-4 py-3 text-sm");//
        //1.1. div child of td_contact
            const div_check_box = document.createElement("div");
            div_check_box.setAttribute("id", "check_box_contact"); 
            div_check_box.setAttribute("class", "custom-control custom-checkbox"); 
            //1.1.1. input child of div_check_box
            const input_child_check_box = document.createElement("input");
            input_child_check_box.setAttribute("type", "checkbox");
            input_child_check_box.setAttribute("class", "custom-control-input");
            input_child_check_box.setAttribute("id", "customCheck_" + contact.contact_id);
            //1.1.2. label child of div_check_box
            const label_child_check_box = document.createElement("label");
            label_child_check_box.setAttribute("class", "custom-control-label");
            label_child_check_box.setAttribute("for", "customCheck_" + contact.contact_id);// 
    //2 td. child of tr_contact
            const td_img_name_email = document.createElement("td");//
            td_img_name_email.setAttribute("class", "px-4 py-3");//
            //2.1. div child of td_img_name_email
            const div_child_td = document.createElement("div");
            div_child_td.setAttribute("class", "flex items-center text-sm");
        //2.1.1. div child of div_child_td
            const div_child_ = document.createElement("div");
            div_child_.setAttribute("class", "relative hidden w-8 h-8 mr-3 rounded-full md:block");
            //2.1.1.1. img child of div_child_
            const img_contact = document.createElement("img");
            img_contact.setAttribute("class", "object-cover w-full h-full rounded-full");
            img_contact.setAttribute("src", "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ");
            //2.1.1.2. div child of div_child_
            const div_contact = document.createElement("div");
            div_contact.setAttribute("class", "absolute inset-0 rounded-full shadow-inner");
            div_contact.setAttribute("aria-hidden", "true");
        //2.1.2. div child of div_child_td
            const div_child_p = document.createElement("div");
            //2.1.2.1. p child of div_child_p
            const p_name = document.createElement("p");
            p_name.setAttribute("class", "font-semibold");
            p_name.textContent = contact.name + " " + contact.lastname
            //1.2.1.2.2. p child of div_child_p
            const p_email = document.createElement("p");
            p_email.setAttribute("class", "text-xs text-gray-600 dark:text-gray-400");
            p_email.textContent = contact.email
    
    //3 td. child of tr_contact, also sibling of td_contact and td_img_name_email
            const td_country_city = document.createElement("td");
            td_country_city.setAttribute("class", "px-4 py-3 text-sm");
            td_country_city.textContent = contact.country+ ", "+contact.city
            //3.1 child of td_country_city
            const p_region = document.createElement("p");
            p_region.setAttribute("class", "text-xs text-gray-600 dark:text-gray-400");            
            p_region.textContent = contact.region

    //4 td.child of tr_contact, also sibling of td_contact, td_img_name_email and td_country_city
            const td_company = document.createElement("td");
            td_company.setAttribute("class", "px-4 py-3 text-xs");
            //4.1 child of td_company
            const span_company = document.createElement("span");
            span_company.setAttribute("class", "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100");
            span_company.textContent = contact.company
            //4.2. child of td_company
            const p_address = document.createElement("p");
            p_address.setAttribute("class", "text-xs text-gray-600 dark:text-gray-400");
            p_address.textContent = contact.address

    //5 td. child of tr_contact, also sibling of td_contact, td_img_name_email, td_country_city and td_company
            const td_profile = document.createElement("td");
            td_profile.setAttribute("class", "px-4 py-3 text-sm");
            td_profile.textContent = contact.profile
            
    //6 td. child of tr_contact, also sibling of td_contact, td_img_name_email, td_country_city, td_company and td_profile
            const td_interest = document.createElement("td");
            td_interest.setAttribute("class", "px-4 py-3 text-sm");
            td_interest.textContent = contact.interests
    
    //7 td. child of tr_contact, also sibling of td_contact, td_img_name_email, td_country_city, td_company, td_profile and td_interest
            const td_actions = document.createElement("td");
            td_actions.setAttribute("class", "px-4 py-3 text-sm");
            //7.1. div child of td_actions
            const div_actions = document.createElement("div");
            div_actions.setAttribute("class", "flex items-center text-smm");
        //7.1.1 div child of div_actions
            const div_actions_edit = document.createElement("div");
            div_actions_edit.setAttribute("id", "edit_contact");
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
            div_actions_trash.setAttribute("id", "trash_contact");
            div_actions_trash.setAttribute("class", "relative hidden w-8 h-8 mr-3 rounded-full md:block");
            //7.1.2.1. a child of div_action_trash
            const a_child_trash = document.createElement("a");
            //7.1.2.1.1. btn child of a_child_trash
            const btn_child_trash = document.createElement("button");
            //7.1.2.1.1.1. img child of btn_child_trash
            const img_trash = document.createElement("img");
            img_trash.setAttribute("class", "object-cover w-full h-full rounded-full");
            img_trash.setAttribute("src", "../public/assets/img/icons8-delete-64-white.png");
            
            document.querySelector("#container_contacts").appendChild(tr_contact);
            //1.
            tr_contact.appendChild(td_contact);
            td_contact.appendChild(div_check_box);
            div_check_box.appendChild(input_child_check_box);
            div_check_box.appendChild(label_child_check_box);

            //2.
            tr_contact.appendChild(td_img_name_email);
            td_img_name_email.appendChild(div_child_td);
            div_child_td.appendChild(div_child_);
            div_child_.appendChild(img_contact);
            div_child_.appendChild(div_contact);
            div_child_td.appendChild(div_child_p);
            div_child_p.appendChild(p_name);
            div_child_p.appendChild(p_email);      

            //3.
            tr_contact.appendChild(td_country_city);
            td_country_city.appendChild(p_region);
            //4.
            tr_contact.appendChild(td_company);
            td_company.appendChild(span_company);
            td_company.appendChild(p_address);
            //5.
            tr_contact.appendChild(td_profile);
            tr_contact.appendChild(td_interest);
            tr_contact.appendChild(td_actions);
            td_actions.appendChild(div_actions);
            div_actions.appendChild(div_actions_edit);
            div_actions_edit.appendChild(a_child_edit);
            a_child_edit.appendChild(btn_child_edit);
            btn_child_edit.appendChild(img_edit);
            div_actions.appendChild(div_actions_trash);
            div_actions_trash.appendChild(a_child_trash);
            a_child_trash.appendChild(btn_child_trash);
            btn_child_trash.appendChild(img_trash);
                       

            /*-----------------------*/
            /*     select a contact   */
            /*----------------------*/
            let check_box_contact = document.getElementById("customCheck_" + contact.contact_id);
            check_box_contact.addEventListener("click", () =>{
                btn_delete_contacts.classList.remove("off")
                btn_delete_contacts.classList.add("on")  
            })

            /*-----------------------------------*/
            /*     delete a contact by actions   */
            /*-----------------------------------*/
            btn_child_trash.addEventListener("click", () =>{
                let id_contact_to_delete = contact.contact_id

                fetch('http://localhost:3001/contacts/'+ id_contact_to_delete, {
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
                .catch (error => console.log('No puede eliminar el contacto ' + error))
                })
        })        
    })
}