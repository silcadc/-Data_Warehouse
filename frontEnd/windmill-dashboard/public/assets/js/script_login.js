//section login
let input_email = document.getElementById("input_email");
let input_password = document.getElementById("input_password");
let button_login = document.getElementById("button_login");

// Función de autenticación
const login = (e) => {
    const data_login = {
        email: input_email.value,        
        password: input_password.value,            
    }
    fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data_login)
        //stringify toma un objeto y lo convierte a JSON
    })
    .then(response => { 
        return response.json();
    })//Se recibe la respuesta como una promesa
    .then(token => { //Se lee la respuesta, siendo solo el token
        localStorage.setItem('sesionToken', `Bearer ${token.token}`);
        window.location.href = '../public/contacts.html';
    })
    .catch((error)=>{
        alert("Verifique usuario y contraseña")
    })
}

button_login.addEventListener("click", () => {
    login();
})