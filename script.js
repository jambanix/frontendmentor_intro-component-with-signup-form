"use strict";

let inputErrorMapping = {};
const textInputs = document.querySelectorAll(".text-input");
const submitBtn = document.querySelector(".btn-submit");

// Mimic success since not posting to a backend
const mimicSubmit = () => {
    alert("success");
    textInputs.forEach(input => {
        setError(input, false);
        input.value = "";
        textInputs[0].focus();
    })
}

// Set the error message and styling for input if fails validation
const setError = (input, isError) => {
    inputErrorMapping[input.getAttribute("name")].forEach(error => {
        isError ? error.classList.remove("hide") : error.classList.add("hide");
    });
    isError ? input.classList.add("input-error") : input.classList.remove("input-error");
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

//  Map to the object and set event listeners for reset upon typing
textInputs.forEach(input => {
    const mapped = inputErrorElements(input);
    Object.assign(inputErrorMapping, mapped);
    input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") setError(input, false);
    });
})

// Style the rows upon error and return true or false if error
const validateInput = (input) => {
    const notEmpty = (input) => (input.value) ? true : false;
    const validateEmail = (value) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value.match(regex) ? true : false;
    }

    // email
    if (input.getAttribute("name") === "email") {
        if(notEmpty(input) && validateEmail(input.value)) {
            setError(input, false);
            return true;
        }
        else {
            setError(input, true);
            return false;
        }
    }
    
    // everything else
    else {
        if(notEmpty(input)) {
            setError(input, false);
            return true;
        }
        else {
            setError(input, true);
            return false;
        }
    }
}

// Check all criteria met 
const handleSubmit = () => Array.from(textInputs).every(validateInput) ?  mimicSubmit() : null;

// Submission events
submitBtn.addEventListener("click", handleSubmit);
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleSubmit();
})

