let input_new_region = document.getElementById("input_new_region");
let add_new_region = document.getElementById("add_new_region");
let cancel_new_region = document.getElementById("cancel_new_region");

let token = localStorage.getItem("sesionToken")

add_new_region.addEventListener("click", () => {
    fetch('http://localhost:3001/regions', {
        method: 'POST',
        headers: new Headers ({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'name': input_new_region.value
        })
    })
    .then (response => { 
        location.href = '../regions.html'
    })
    .catch (error => console.log("error al agregar una region" + error) )
})