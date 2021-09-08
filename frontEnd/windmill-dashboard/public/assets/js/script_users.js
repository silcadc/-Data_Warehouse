//users
let check_box_general_user = document.getElementById("check_box_general_user");
let check_box_user = document.getElementById("check_box_user");
//users---create new User
let name_newUser = document.getElementById("name_newUser");
let lastname_newUser = document.getElementById("lastname_newUser");
let email_newUser = document.getElementById("email_newUser");
let perfil_newUser = document.getElementById("perfil_newUser");
let check_box_isAdmin = document.getElementById("check_box_isAdmin");
let password_newUser = document.getElementById("password_newUser");
let add_newUser = document.getElementById("add_newUser");
let delete_newUser = document.getElementById("delete_newUser");
let jwtClave = "5XSNGM0bTFjNCpEV0ZNTElORS02Mg==";


/*----------------------------*/
/*       GIFOS IN TREND       */
/*----------------------------*/
fetch(`http://localhost:3001/users?api_key=${API_KEY}`)
    .then (response => response.json())
    .then (response => {
        apiResponseList = response.data;
        structureGifosTrend(apiResponseList); 
        //Con esta funcion descargo los gifos
        let iconDownloadStyle = document.querySelectorAll(".iconDownloadStyle")
        iconDownloadStyle.forEach(iconDown => {
            iconDown.addEventListener("click", () => {
                let functionForDownload = async () => {
                    let anchor = document.createElement("a");
                    let fatherOfElem = iconDown.parentNode
                    let previousSiblingUrl = fatherOfElem.previousSibling
                    let imgUrl = previousSiblingUrl.getAttribute("src")
                    console.log(imgUrl)
                    //utilizo fetch para la comunicación con el API, la respuesta
                    //mediante response.blob es como un objeto binario.
                    let response = await fetch(imgUrl);
                    let urlBlob = await response.blob();
                    
                    let urlLocal = window.URL.createObjectURL(urlBlob);
                    anchor.setAttribute("href", urlLocal);
                    anchor.setAttribute("target", "_blank");
                    anchor.setAttribute("download", "my_Gifos");
                    //con esto emulo el click sobre el elemento ancla
                    anchor.click();
                }
                functionForDownload();
            })
        })
    })