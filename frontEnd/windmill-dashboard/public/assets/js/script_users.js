//users
let check_box_general_users = document.getElementById("check_box_general_user");
let btn_delete_user = document.getElementById("btn_delete_user");
//users---create new User
let name_newUser = document.getElementById("name_newUser");
let lastname_newUser = document.getElementById("lastname_newUser");
let email_newUser = document.getElementById("email_newUser");
let perfil_newUser = document.getElementById("perfil_newUser");
let check_box_isAdmin = document.getElementById("check_box_isAdmin");
let password_newUser = document.getElementById("password_newUser");
let add_newUser = document.getElementById("add_newUser");
let delete_newUser = document.getElementById("delete_newUser");

let token = localStorage.getItem("sesionToken")
console.log(token)

/*----------------------------*/
/*       registered users     */
/*----------------------------*/
fetch('http://localhost:3001/users', {
    method: 'GET',
    headers: new Headers ({
        'Authorization': token,
        'Content-Type': 'application/json'
    })
})
.then (response => response.json())
.then (response => {
    console.log(response)
    response.forEach(user => {
        const tr_user = document.createElement("tr")
        tr_user.setAttribute("class", "text-gray-700 dark:text-gray-400");
        //child of tr_user
        const td_child_check_box = document.createElement("td");
        td_child_check_box.setAttribute("class", "px-4 py-3 text-sm");
        //grandson of tr_user
        const div_child_check_box = document.createElement("div");
        div_child_check_box.setAttribute("id", "check_box_user"); 
        div_child_check_box.setAttribute("class", "custom-control custom-checkbox"); 
        //children of grandson
        const input_child_check_box = document.createElement("input");
        input_child_check_box.setAttribute("type", "checkbox");
        input_child_check_box.setAttribute("class", "custom-control-input"); 
        input_child_check_box.setAttribute("id", "customCheck_" + user.user_id); 
        //sibling 
        const label_child_check_box = document.createElement("label");
        label_child_check_box.setAttribute("class", "custom-control-label"); 
        label_child_check_box.setAttribute("for", "customCheck_" + user.user_id); 

        //child of tr_user, also sibling of td_child_check_box
        const td_child_name = document.createElement("td");
        td_child_name.setAttribute("class", "px-4 py-3");
        //child of td_child_name
        const div_child_name = document.createElement("div");
        div_child_name.setAttribute("class", "flex items-center text-sm");
        //children of div_child_name
        const div_child_name_img = document.createElement("div");
        div_child_name_img.setAttribute("class", "relative hidden w-8 h-8 mr-3 rounded-full md:block");
        //children of div_child_name_img
        const img_child = document.createElement("img");
        img_child.setAttribute("class", "object-cover w-full h-full rounded-full");
        img_child.setAttribute("src", "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ");
        const div_child = document.createElement("div");
        div_child.setAttribute("class", "absolute inset-0 rounded-full shadow-inner");
        div_child.setAttribute("aria-hidden", "true");
        //sibling of div_child_name_img
        const div_child_name_name = document.createElement("div");

        //child of div_child_name_name
        const p_child_name = document.createElement("p");
        p_child_name.setAttribute("class", "font-semibold");
        p_child_name.textContent = user.name
        
        //child of tr_user, also sibling of td_child_check_box and td_child_name
        const td_child_lastName = document.createElement("td");
        td_child_lastName.setAttribute("class", "px-4 py-3 text-sm");
        td_child_lastName.textContent = user.lastname

        //child of tr_user, also sibling of td_child_check_box, td_child_name and td_child_lastName
        const td_child_email = document.createElement("td");
        td_child_email.setAttribute("class", "px-4 py-3 text-xs");
        //child of td_child_email
        const span_child_email = document.createElement("span");
        span_child_email.setAttribute("class", "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100");
        span_child_email.textContent = user.email
        
        //child of tr_user, also sibling of td_child_check_box, td_child_name, td_child_lastName and td_child_email
        const td_child_position = document.createElement("td");
        td_child_position.setAttribute("class", "px-4 py-3 text-sm");
        td_child_position.textContent = user.cargo

        //child of tr_user, also sibling of td_child_check_box, td_child_name, td_child_lastName, td_child_email and td_child_position
        const td_child_profile = document.createElement("td");
        td_child_profile.setAttribute("class", "px-4 py-3 text-sm");
        td_child_profile.textContent = user.is_admin

        //child of tr_user, also sibling of td_child_check_box, td_child_name, td_child_lastName, td_child_email, td_child_position and td_child_profile
        const td_child_password = document.createElement("td");
        td_child_password.setAttribute("class", "px-4 py-3 text-sm");
        td_child_password.textContent = user.password

        document.querySelector("#container_users").appendChild(tr_user);
        tr_user.appendChild(td_child_check_box);
        td_child_check_box.appendChild(div_child_check_box);
        div_child_check_box.appendChild(input_child_check_box);
        div_child_check_box.appendChild(label_child_check_box);
        
        tr_user.appendChild(td_child_name);
        td_child_name.appendChild(div_child_name);
        div_child_name.appendChild(div_child_name_img);
        div_child_name.appendChild(div_child_name_name);
        div_child_name_img.appendChild(img_child);
        div_child_name_img.appendChild(div_child);
        div_child_name_name.appendChild(p_child_name);

        tr_user.appendChild(td_child_lastName);

        tr_user.appendChild(td_child_email);
        td_child_email.appendChild(span_child_email);

        tr_user.appendChild(td_child_position);
        tr_user.appendChild(td_child_profile);
        tr_user.appendChild(td_child_password);

        /*-----------------------*/
        /*     select a user    */
        /*----------------------*/
        let check_box_user = document.getElementById("customCheck_" + user.user_id);
        check_box_user.addEventListener("click", () =>{
            btn_delete_user.classList.remove("off")
            btn_delete_user.classList.add("on")  
        })
        
    })        
})

/*----------------------------*/
/*       select all users     */
/*----------------------------*/
check_box_general_users.addEventListener("click", () =>{
    btn_delete_user.classList.remove("off")
    btn_delete_user.classList.add("on")  
})

/*----------------------*/
/*     delete users     */
/*------------------- --*/
function getCheckedIDs() {
    let elements = document.getElementsByTagName("INPUT");
    
    let checkedArray =  new Array();
    for(let i=0;i<elements.length;i++)
    {
        if(elements[i].type === 'checkbox' && elements[i].checked)
        {
            checkedArray.push(elements[i].id);
        }
    }
    console.log(checkedArray)
    return checkedArray;
}

btn_delete_user.addEventListener("click", () => {
    let arrayCheckbox = getCheckedIDs()

    fetch('http://localhost:3001/users/:id', {
    method: 'DELETE',
    headers: new Headers ({
        'Authorization': token,
        'Content-Type': 'application/json'
    }) 
    })
    .then (response => response.json())
    .then (response => {
        console.log(response)
        
    })
});

