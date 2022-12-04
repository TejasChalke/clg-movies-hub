const mediaQuerySmall = window.matchMedia('(max-width: 600px)'), mediaQueryMed = window.matchMedia('(max-width: 1200px)'), mediaQueryLarge = window.matchMedia('(min-width: 1201px)')
let movieData = []
let mainContainer= document.getElementsByClassName("main-content")[0]

document.addEventListener("loadstart",  checkSize());

document.addEventListener('DOMContentLoaded', callSV(), false);

window.addEventListener("resize", checkSize());

window.addEventListener("resize", () => {
    if(mediaQueryLarge.matches){
        document.getElementsByClassName("sidebar")[0].classList.remove("deactive")
    }else{
        document.getElementsByClassName("sidebar")[0].classList.add("deactive")
    }
});

function toggleMenu(){
    let menubtn = document.getElementsByClassName("content-menu")[0]

    if(mediaQueryLarge.matches){
        document.getElementById("menu-1").classList.add("deactive");
        document.getElementById("menu-2").classList.remove("deactive");
    }else{
        document.getElementById("menu-1").classList.remove("deactive");
        document.getElementById("menu-2").classList.add("deactive");
    }

    if(menubtn.getAttribute("data-status") === "active"){
        menubtn.setAttribute("data-status", "deactive")
        setTimeout(() => {
            menubtn.style.display = "none"
        }, 300);
    }else{
        menubtn.style.display = "block"
        setTimeout(() => { 
            menubtn.setAttribute("data-status", "active")
        }, 100);
    }
}

function checkSize(){
    if(mediaQuerySmall.matches || mediaQueryMed.matches){
        document.getElementsByClassName("sidebar")[0].classList.add("deactive")
    }else{
        document.getElementsByClassName("sidebar")[0].classList.remove("deactive")
    }
}

function callSV(){
    let fileName = window.location.href.split("/").pop();
    let data = {}
    switch (fileName){
        case "action1.html":
            data = {genId: 28}
            break;
        case "animation1.html":
            data = {genId: 16}
            break;
        case "comedy1.html":
            data = {genId: 35}
            break;
        case "content1.html":
            data = {genId: 12}
            break;
        case "horror1.html":
            data = {genId: 27}
            break;
        default:
            data = {genId: 12}
            console.log("error in calling server")
            break;
    }
    fetch("https://mymovieshub.vercel.app/searchByGenre", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type" : "application/json"
        }
    }).then(response => {
        return response.json()
    }).then( data => {
        movieData = data.filter((currentValue, index) => {
            if(index < 12){
                return currentValue;
            }
        });
        
        mainContainer.innerHTML= "";
        movieData.forEach(data => {
            let genres= ""
            for(let index = 0; index < data.genres.length; index++) {
                const element = data.genres[index];
                genres += `<div class="movie-genre">${element}</div>`;
            }
            mainContainer.insertAdjacentHTML("beforeend", 
             `<div class="display-block" style="background-image: url(${data.thumbnail});">
                <div class="movie-info">
                <div class="movie-release"><span class="primary">Release: </span>${data.release_date}</div>
                <div class="movie-genre"><span class="primary">Genre: </span>${genres}
                </div>
                </div>
             </div>`
            )
        })
    }).catch(error => {
        console.log(error)
    })
    document.getElementsByClassName("user-name")[0].innerText = localStorage.getItem("username").toUpperCase()
    
}

function logOut(){
    localStorage.removeItem("username")
    window.location.href = "./index.html";
}

function gotoPage(event){
    let temp = "content1.html"
    if(event.target.innerHTML !== "" && event.target.innerHTML !== "Home"){
        temp = event.target.innerHTML.toLowerCase() + "1.html"
    }else if(event.target.innerHTML === "home"){
        temp = "content1.html"
    }
    console.log(temp)
    window.location.href = "./"+temp;
    event.stopPropagation();
}