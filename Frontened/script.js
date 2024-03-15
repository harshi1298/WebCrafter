const loginbutton = document.getElementById('loginPage');
loginbutton.addEventListener("click",open=()=>{
    let pop=document.querySelector(".popup");
    pop.style.display="block";
    let backImg = document.querySelector(".homeImg");
    backImg.style.filter="blur(10px)";
    let sign=querySelector("#loginPage");
    sign.style.opacity="0";
    let sign1=querySelector("#tosignup");
    sign1.style.opacity="0";
})
const logback=document.getElementById('back2');
logback.addEventListener("click",close=()=>{
    let popBack=document.querySelector(".popup");
    popBack.style.display="none";////////////
    let backImg = document.querySelector(".homeImg");
    backImg.style.filter="blur(0px)";
    let rightbar=document.querySelector("#loginPage");
    rightbar.style.opacity="1";
    let sign2=querySelector("#tosignup");
    sign2.style.opacity="1";
})
const signbutton=document.getElementById('tosignup');
signbutton.addEventListener("click",opensign=()=>{
    let signUp=document.querySelector(".check");
    signUp.style.display="block";////////////
    let Img = document.querySelector(".homeImg");
    Img.style.filter="blur(10px)";
    let rightbar=document.querySelector(".rightHead");
    rightbar.style.opacity="0";
})
const signback=document.querySelector('#back1');
signback.addEventListener("click",closeit=()=>{
    let signBack=document.querySelector(".check");
    signBack.style.display="none";////////////
    let Img = document.querySelector(".homeImg");
    Img.style.filter="blur(0px)";
 rightbar=document.querySelector(".rightHead");
    rightbar.style.opacity="1";
})
employersign=()=>{
    window.location.href="signUp.html"
}
employeesign=()=>{
    window.location.href="signUpjob.html"
}
let q=getElementById("prev");
q.addEventListener("click",comeback=()=>{
    window.history.back();
})
goBack=()=>{
    window.history.back();
}