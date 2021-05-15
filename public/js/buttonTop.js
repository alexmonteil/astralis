goToTopbutton = document.getElementById("btnTop");


window.onscroll = function() {
    scrollFunction();
};


function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        goToTopbutton.style.display = "block";
    } else {
        goToTopbutton.style.display = "none";
    }
};


function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


goToTopbutton.addEventListener("click", topFunction);