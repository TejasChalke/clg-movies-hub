const mediaQuery = window.matchMedia('(max-width: 600px)')
window.addEventListener("resize", checkSize());

document.addEventListener("loadstart",  checkSize());

function checkSize(){
    if(mediaQuery.matches){
        document.getElementsByClassName("login-btn")[0].classList.add("deactive")
        document.getElementsByClassName("index-menu")[0].classList.remove("deactive")
        document.getElementsByClassName("sign-up-btn")[0].classList.add("deactive")
    }else{
        document.getElementsByClassName("login-btn")[0].classList.remove("deactive")
        document.getElementsByClassName("index-menu")[0].classList.add("deactive")
        document.getElementsByClassName("sign-up-btn")[0].classList.remove("deactive")
    }
}

function loginPage(){
    window.location.href = "./login.html";
}