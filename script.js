"use strict;"

let inputErrorMapping = {};
const textInputs = document.querySelectorAll(".text-input");
const submitBtn = document.querySelector(".btn-submit");

const mimicSubmit = () => {

}

// Returns object with input name as key and array with the 2 elements for class toggle
const inputErrorElements = (input) => {
    const errorImg = input.nextElementSibling;
    const errorMsg = input.parentElement.nextElementSibling;
    
    return {[input.getAttribute("name")]: [
        errorImg,
        errorMsg
    ]};
}

//  Map to the object 
textInputs.forEach(input => {
    const mapped = inputErrorElements(input);
    Object.assign(inputErrorMapping, mapped);
})


const setError = (input) => {
    inputErrorMapping.input.forEach(error => {
        error.classList.toggle("hide");
        input.classList.toggle("error");
    });
}




const validateInput = (input) => {
    const notEmpty = (input) => (input.text.value) ? true: false;
    const validateEmail = (value) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value.match(regex) ? true : false;
    }
    if (input.text.value === "email") {
        notEmpty(input) && validateEmail(input.text.value) ? mimicSubmit() : setError(input);
    }
    
}

submitBtn.addEventListener("click", () => {

})