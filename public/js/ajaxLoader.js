const h1 = document.querySelector("h1");
const loaderDiv = document.querySelector("div.ajaxLoader");
const form = document.querySelector("form");
const submitBtn = document.querySelector("button.btn.btn-secondary");
const anchor = document.querySelector("a#ajax");
const imageInput = document.querySelector("input#image");


form.addEventListener("submit", () => {

    h1.innerText = "Loading ...";
    form.style.display = "none";
    anchor.style.display = "none";
    loaderDiv.style.display = "block";
});




