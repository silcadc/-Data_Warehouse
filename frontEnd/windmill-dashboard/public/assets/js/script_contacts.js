//section contact
let search_input_contact = document.getElementById("search_input_contact");
let check_box_contacts_general = document.getElementById("check_box_contacts_general");
let check_box_contact = document.getElementById("check_box_contact");
let edit_contact = document.getElementById("edit_contact");
let delete_contact = document.getElementById("delete_contact");
//---Add contact
let name_input_newContact = document.getElementById("name_input_newContact");
let lastname_input_newContact = document.getElementById("lastname_input_newContact");
let profile_input_newContact = document.getElementById("profile_input_newContact");
let email_input_newContact = document.getElementById("email_input_newContact");
let company_input_newContact = document.getElementById("company_input_newContact");
let region_input_newContact = document.getElementById("region_input_newContact");
let country_input_newContact = document.getElementById("country_input_newContact");
let city_input_newContact = document.getElementById("city_input_newContact");
let adress_input_newContact = document.getElementById("address_input_newContact");
let interest_input_newContact = document.getElementById("interest_input_newContact");
let channel_input_newContact = document.getElementById("channel_input_newContact");
let account_input_newContact = document.getElementById("account_input_newContact");
let preferences_input_newContact = document.getElementById("preferences_input_newContact");
let add_channel_newContact = document.getElementById("add_channel_newContact");
let save_newContact = document.getElementById("save_newContact");
let cancel_newContact = document.getElementById("cancel_newContact");

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