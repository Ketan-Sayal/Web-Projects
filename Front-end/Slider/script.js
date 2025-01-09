let nextBtn = document.getElementById("next");
let backBtn = document.getElementById("back");
let scrollBar = document.querySelector(".scroll");

scrollBar.addEventListener("wheel", (e) => {
    scrollBar.scrollLeft += e.deltaY;
    scrollBar.style.scrollBehavior = "auto";
});

nextBtn.addEventListener("click", () => {
    scrollBar.scrollLeft += 100;
    scrollBar.style.scrollBehavior = "smooth";
});

backBtn.addEventListener("click", () => {
    scrollBar.scrollLeft -= 100;
    scrollBar.style.scrollBehavior = "smooth";
});