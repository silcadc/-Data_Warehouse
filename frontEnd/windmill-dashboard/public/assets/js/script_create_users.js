//create new User
let name_newUser = document.getElementById("name_newUser");
let lastname_newUser = document.getElementById("lastname_newUser");
let email_newUser = document.getElementById("email_newUser");
let profile_newUser = document.getElementById("profile_newUser");
let check_box_isAdmin = document.getElementById("customCheck1");
let password_newUser = document.getElementById("password_newUser");
let repeat_pass_newUser = document.getElementById("repeat_pass_newUser");
let add_newUser = document.getElementById("add_newUser");

let delete_newUser = document.getElementById("delete_newUser");

let token = localStorage.getItem("sesionToken")
let id_user_to_edit = localStorage.getItem("key_to_edit")
localStorage.setItem("key_to_edit", "")  

/*----------------------------------*/
/*     create new user function     */
/*----------------------------------*/
function add_new_user () {
    let is_admin = false;
    if (check_box_isAdmin.checked) {
        is_admin = true;
    }
    if (repeat_pass_newUser.value === password_newUser.value) {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: new Headers ({
                'Authorization': token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                'name': name_newUser.value, 
                'lastname': lastname_newUser.value, 
                'email': email_newUser.value, 
                'profile': profile_newUser.value,  
                'is_admin': is_admin,  
                'password': password_newUser.value
            })
        })
        //.then (response => response.json())este json era un problema, enviaba datos undefined
        .then (response => { 
           location.href = '../users.html'
        })
        .catch (error => console.log("error al crear usuario" + error) )
    } else {
        alert("No coinciden las contraseñas")
    }
}

/*---------------------------------*/
/*     performans by old users     */
/*---------------------------------*/
function old_user_show () {
    fetch('http://localhost:3001/users/'+ id_user_to_edit, {
        method: 'GET',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }) 
    })
    .then (response => response.json())
    .then (response => {
        name_newUser.value = response[0].name
        lastname_newUser.value = response[0].lastname
        email_newUser.value = response[0].email
        profile_newUser.value = response[0].profile
        check_box_isAdmin.value = response[0].is_admin
        if (check_box_isAdmin.value === '1'){
            check_box_isAdmin.checked = true;
        } else {
            check_box_isAdmin.checked = false;
        }
        password_newUser.value = response[0].password
        repeat_pass_newUser.value = response[0].password
    })
    .catch (error => console.log('No puede editar el usuario ' + error))
}

if (id_user_to_edit !== "") {
    old_user_show();
}
console.log("id_user_to_edit " + id_user_to_edit)


/*---------------------------------*/
/*     edit old users function     */
/*---------------------------------*/
function update_old_user () {
    let is_admin = false;
    if (check_box_isAdmin.checked) {
        is_admin = true;
    }
    console.log(is_admin)
    fetch('http://localhost:3001/users/'+ id_user_to_edit, {
        method: 'PUT',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': name_newUser.value, 
            'lastname': lastname_newUser.value, 
            'email': email_newUser.value, 
            'profile': profile_newUser.value,  
            'is_admin': is_admin,  
            'password': password_newUser.value
        })
    })
    //.then (response => response.json())//este json era un problema, enviaba datos undefined
    .then (response => {
        location.href = '../users.html'
    })
    .catch (error => console.log("error al crear usuario" + error) )
}

/*------------------------------*/
/*     create or edit users     */
/*------------------------------*/
add_newUser.addEventListener("click", () => {
    if(id_user_to_edit === "") {
        console.log("soy nuevo")
        add_new_user();
    } else {
        console.log("soy viejo")
        update_old_user()
    }
});




