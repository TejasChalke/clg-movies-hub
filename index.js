const mediaQuery = window.matchMedia('(max-width: 600px)')
window.addEventListener("resize", () => {
    if(mediaQuery.matches){
        document.getElementsByClassName("login-btn")[0].classList.add("deactive")
        document.getElementsByClassName("sign-up-btn")[0].classList.add("deactive")
        document.getElementsByClassName("index-menu")[0].classList.remove("deactive")
    }else{
        document.getElementsByClassName("login-btn")[0].classList.remove("deactive")
        document.getElementsByClassName("sign-up-btn")[0].classList.remove("deactive")
        document.getElementsByClassName("index-menu")[0].classList.add("deactive")
    }
})


function tempFunc(){
    window.location.href = "./content1.html";
}