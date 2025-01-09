let img = document.getElementById('img');
let sideBar = document.getElementById("side-bar");
let search = document.getElementById("search");
let otherPosts = document.querySelectorAll(".other-post");
let myPosts = document.querySelectorAll(".my-post");
let headings = document.querySelectorAll(".heading");
let contents = document.querySelectorAll(".content");
let mainHeading = document.querySelectorAll(".head");
let comments = document.querySelectorAll(".comment");
let CommentSections = document.querySelectorAll(".Comments");

img.addEventListener("click", () => {
    if (sideBar.classList.contains("hidden")) {
        setTimeout(() => {
            sideBar.classList.remove("hidden");
            sideBar.classList.add("flex");
        }, 500);

    }
    else {
        setTimeout(() => { 
            sideBar.classList.remove("flex");
            sideBar.classList.add("hidden");
        }, 500);
    }
});

search.addEventListener('input', () => { 
    let searchTerm = search.value.toLowerCase();
    if (searchTerm == "me") {
        headings.forEach((heading, index) => {
            if (heading.innerHTML.toLowerCase()=="@me") {
                heading.parentElement.classList.add("inline-block");
                heading.parentElement.classList.remove("hidden");
            }
            else {
                heading.parentElement.classList.add("hidden");
                heading.parentElement.classList.remove("inline-block");
            }
        });
    }
    else {
        headings.forEach((heading, index) => {
            if (heading.innerHTML.toLowerCase().includes(searchTerm) || contents[index].innerHTML.toLowerCase().includes(searchTerm)|| mainHeading[index].innerHTML.toLowerCase().includes(searchTerm)) {
                heading.parentElement.classList.add("inline-block");
                heading.parentElement.classList.remove("hidden");
            }
            else {
                heading.parentElement.classList.add("hidden");
                heading.parentElement.classList.remove("inline-block");
            }
        });
    }
});

comments.forEach((comment, index) => {
    comment.addEventListener("click", () => {
        CommentSections[index].classList.toggle("hidden");
    });
});