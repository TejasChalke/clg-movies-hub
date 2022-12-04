"use strict"

var login1 = document.getElementById("login");
var signup1 = document.getElementById("signup");
var btn1 = document.getElementById("btn");

function signup(){
    login1.style.left="-400px";
    signup1.style.left="50px";
    btn1.style.left="110px";
}

function login(){
    login1.style.left="50px";
    signup1.style.left="450px";
    btn1.style.left="0px";
}

function tryLogin(){
    let inputId = document.getElementById("login-id").value, inputPass = document.getElementById("login-pass").value
    let data = {}
    
    if(inputId.trim().length !== 0 && inputPass.trim().length > 7){
        data = {
            uid : inputId.trim(),
            upass : inputPass.trim()
        }
    }else{
        alert("Enter valid details!")
        return;
    }

    fetch("https://mymovieshub.vercel.app/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type" : "application/json"
        }
    }).then(response => {
        return response.json()
    }).then( rdata => {
        if(rdata.status){
            localStorage.setItem("username", inputId.trim())
            window.location.href = "./content1.html";
        }else{
            window.alert("Enter valid details!")
        }
    }).catch(error => {
        console.log(error)
    }) 
}

function trySignUp(){
    let inputId = document.getElementById("signup-id").value, inputPass = document.getElementById("signup-pass").value, inputEmail = document.getElementById("signup-eid").value
    let data = {}

    if(inputId.trim().length > 4 && inputPass.trim().length > 7 && validEmail(inputEmail)){
        data = {
            uid : inputId.trim(),
            upass : inputPass.trim(),
            uemail: inputEmail.trim()
        }
    }else{
        alert("Please enter valid details!")
        return;
    }

    fetch("https://mymovieshub.vercel.app/signup", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type" : "application/json"
        }
    }).then(response => {
        return response.json()
    }).then( rdata => {
        if(rdata.status){
            window.alert("Signed up, Please log in to continue!")
        }else{
            window.alert("Enter valid details!")
        }
    }).catch(error => {
        console.log(error)
    })
}

function validEmail(str) {
    var atSymbol = str.indexOf("@");
    if(atSymbol < 1) return false;

    var dot = str.indexOf(".");
    if(dot <= atSymbol + 2) return false;

    if (dot === str.length - 1) return false;

    return true;
}