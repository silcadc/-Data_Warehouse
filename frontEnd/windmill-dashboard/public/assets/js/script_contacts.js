//section contact
let search_input_contact = document.getElementById("search_input_contact");
let check_box_contacts_general = document.getElementById("check_box_contacts_general");
let check_box_contact = document.getElementById("check_box_contact");
let edit_contact = document.getElementById("edit_contact");
let delete_contact = document.getElementById("delete_contact");

let token = localStorage.getItem("sesionToken")

/*----------------------------*/
/*        AUTOCOMPLETE        */
/*----------------------------*/
// const searchSuggestions = async term => {
//     const response = await fetch(`http://localhost:3001/contacts?q=${term}&api_key=${API_KEY}`)
//     const responseJson = await response.json()
//     searchAutocomplete.innerHTML = ''
//     responseJson.data.slice(0, 5).forEach(suggest => {
//         const item = document.createElement('li')
//         item.textContent = suggest.name
//         searchAutocomplete.appendChild(item)
//     })
//     let liAutocomplete = document.querySelectorAll(".searchAutocomplete > li")
//     liAutocomplete.forEach(li => {
//         li.addEventListener('click', () => {
//             let term = li.textContent
//             inputTextToSearch.value = term
//             getGifos(inputTextToSearch.value) 
            
//         })
//     })
// };


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
            const tr_contact = document.createElement("tr");//
            tr_contact.setAttribute("class", "text-gray-700 dark:text-gray-400");//
            //child of tr_contact
            const td_child_check_box = document.createElement("td");//
            td_child_check_box.setAttribute("class", "px-4 py-3 text-sm");//
            //grandson of tr_contact
            const div_child_check_box = document.createElement("div");//
            div_child_check_box.setAttribute("id", "check_box_contact"); //
            div_child_check_box.setAttribute("class", "custom-control custom-checkbox");// 
            //children of grandson
            const input_child_check_box = document.createElement("input");//
            input_child_check_box.setAttribute("type", "checkbox");//
            input_child_check_box.setAttribute("class", "custom-control-input");//
            input_child_check_box.setAttribute("id", "customCheck_" + contact.contact_id);// 
            //sibling 
            const label_child_check_box = document.createElement("label");//
            label_child_check_box.setAttribute("class", "custom-control-label");// 
            label_child_check_box.setAttribute("for", "customCheck_" + contact.contact_id);// 
    
            //child of tr_contact, also sibling of td_child_check_box
            const td_child_name = document.createElement("td");//
            td_child_name.setAttribute("class", "px-4 py-3");//
            //child of td_child_name
            const div_child_name = document.createElement("div");
            div_child_name.setAttribute("class", "flex items-center text-sm");//
            //children of div_child_name
            const div_child_name_img = document.createElement("div");//
            div_child_name_img.setAttribute("class", "relative hidden w-8 h-8 mr-3 rounded-full md:block");//
            //children of div_child_name_img
            const img_child = document.createElement("img");
            img_child.setAttribute("class", "object-cover w-full h-full rounded-full");
            img_child.setAttribute("src", "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ");
            const div_child = document.createElement("div");
            div_child.setAttribute("class", "absolute inset-0 rounded-full shadow-inner");
            div_child.setAttribute("aria-hidden", "true");
            //sibling of div_child_name_img
            const div_child_name_name = document.createElement("div");
            //children of div_child_name_name
            const p_child_name = document.createElement("p");
            p_child_name.setAttribute("class", "font-semibold");
            p_child_name.textContent = contact.name
            const p_child_email = document.createElement("p");
            p_child_email.setAttribute("class", "text-xs text-gray-600 dark:text-gray-400");
            p_child_email.textContent = contact.email

            //child of tr_contact, also sibling of td_child_check_box and td_child_name
            const td_child_region = document.createElement("td");
            td_child_region.setAttribute("class", "px-4 py-3 text-sm");
            //td_child_region.textContent = contact.country //aun no tengo los datos del country
            //child of td_child_region
            const p_child_region = document.createElement("p");
            p_child_region.setAttribute("class", "text-xs text-gray-600 dark:text-gray-400");
            //p_child_region.textContent = contact.region //aun no tengo la region


            //child of tr_contact, also sibling of td_child_check_box, td_child_name and td_child_lastName
            const td_child_company = document.createElement("td");
            td_child_company.setAttribute("class", "px-4 py-3 text-xs");
            //child of td_child_company
            const span_child_company = document.createElement("span");
            span_child_company.setAttribute("class", "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100");
            span_child_company.textContent = contact.company_id
            
            //child of tr_contact, also sibling of td_child_check_box, td_child_name, td_child_lastName and td_child_email
            const td_child_position = document.createElement("td");
            td_child_position.setAttribute("class", "px-4 py-3 text-sm");
            td_child_position.textContent = contact.profile
    
            //child of tr_contact, also sibling of td_child_check_box, td_child_name, td_child_lastName, td_child_email and td_child_position
            const td_child_interest = document.createElement("td");
            td_child_interest.setAttribute("class", "px-4 py-3 text-sm");
            //td_child_interest.textContent = contact.//me falta el nivel de interes en la base de datos
    
            //child of tr_contact, also sibling of td_child_check_box, td_child_name, td_child_lastName, td_child_email, td_child_position and td_child_tipo
            const td_child_actions = document.createElement("td");
            td_child_actions.setAttribute("class", "px-4 py-3 text-sm");
            td_child_password.textContent = contact.password

            //child of tr_contact, also sibling of td_child_check_box, td_child_name, td_child_lastName, td_child_email, td_child_position, td_child_tipo and td_child_action
            const td_child_action = document.createElement("td");
            td_child_action.setAttribute("class", "flex items-center text-sm");//flex items-center text-sm
        //child of td_child_action //px-4 py-3 text-sm
            const div_child_action_one = document.createElement("div");
            div_child_action_one.setAttribute("class", "relative hidden w-8 h-8 mr-3 rounded-full md:block");
            //children of div_child_action_one
            const a_child_one = document.createElement("a");
            //children of a_child_one
            const btn_child_one = document.createElement("button");
            //children of btn_child_one
            const img_div_one = document.createElement("img");
            img_div_one.setAttribute("class", "object-cover w-full h-full rounded-full");
            img_div_one.setAttribute("src", "../public/assets/img/icons8-edit-24-white.png");
        //child of td_child_action
            const div_child_action_two = document.createElement("div");
            div_child_action_two.setAttribute("class", "relative hidden w-8 h-8 mr-3 rounded-full md:block");
            //children of div_child_action_two
            const a_child_two = document.createElement("a");
            //children of a_child_two
            const btn_child_two = document.createElement("button");
            //children of btn_child_two
            const img_div_two = document.createElement("img");
            img_div_two.setAttribute("class", "object-cover w-full h-full rounded-full");
            img_div_two.setAttribute("src", "../public/assets/img/icons8-delete-64-white.png");
            

            document.querySelector("#container_contacts").appendChild(tr_contact);
            tr_contact.appendChild(td_child_check_box);
            td_child_check_box.appendChild(div_child_check_box);
            div_child_check_box.appendChild(input_child_check_box);
            div_child_check_box.appendChild(label_child_check_box);
            
            tr_contact.appendChild(td_child_name);
            td_child_name.appendChild(div_child_name);
            div_child_name.appendChild(div_child_name_img);
            div_child_name.appendChild(div_child_name_name);
            div_child_name_img.appendChild(img_child);
            div_child_name_img.appendChild(div_child);
            div_child_name_name.appendChild(p_child_name);
            div_child_name_name.appendChild(p_child_email);
    
            tr_contact.appendChild(td_child_region);
            td_child_region.appendChild(p_child_region);
    
            tr_contact.appendChild(td_child_company);
            td_child_company.appendChild(span_child_company);
    
            tr_contact.appendChild(td_child_position);
            tr_contact.appendChild(td_child_interest);
            tr_contact.appendChild(td_child_actions);
            tr_contact.appendChild(td_child_action);
            td_child_action.appendChild(div_child_action_one);
            div_child_action_one.appendChild(a_child_one);
            a_child_one.appendChild(btn_child_one);
            btn_child_one.appendChild(img_div_one);
            td_child_action.appendChild(div_child_action_two);
            div_child_action_two.appendChild(a_child_two);
            a_child_two.appendChild(btn_child_two);
            btn_child_two.appendChild(img_div_two);

            /*-----------------------*/
            /*     select a user    */
            /*----------------------*/
            // let check_box_user = document.getElementById("customCheck_" + user.user_id);
            // check_box_user.addEventListener("click", () =>{
            //     btn_delete_user.classList.remove("off")
            //     btn_delete_user.classList.add("on")  

            //     btn_update_user.classList.remove("off")
            //     btn_update_user.classList.add("on")
            // })

            /*--------------------------------*/
            /*     delete a user by actions   */
            /*--------------------------------*/
            // btn_child_two.addEventListener("click", () =>{
            //     console.log(user)
            //     console.log(user.user_id)
            //     let id_user_to_delete = user.user_id

            //     fetch('http://localhost:3001/users/'+ id_user_to_delete, {
            //     method: 'DELETE',
            //     headers: new Headers ({
            //         'Authorization': token,
            //         'Content-Type': 'application/json'
            //     }) 
            //     })
            //     .then (response => {
            //         response.json()
            //         location.reload()
            //     })
            //     .catch (error => console.log('No puede eliminar el usuario ' + error))
            //     })
        })        
    })
}