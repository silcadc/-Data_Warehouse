let input_new_region = document.getElementById("input_new_region");
let add_new_region = document.getElementById("add_new_region");
let cancel_new_region = document.getElementById("cancel_new_region");

add_new_region.addEventListener("click", () => {
    console.log("no entra")
    let name_new_region = input_new_region.value
    localStorage.setItem("key_region", name_new_region)  
    console.log(name_new_region)
    window.location.href = '../regions.html'
    console.log(name_new_region) 

})