let checkBoxes = document.querySelectorAll(".Inclludes");
let btn = document.getElementById("btn");
let length = 8;
let numbers = "1234567890";
let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerCase = upperCase.toLowerCase();
let specialChars ="!@#$%^&*()_+=?><|{}/";
let Password1 = document.getElementById("Password");
let image = document.getElementById("image"); 
btn.addEventListener("click", () => {
    check();
    // console.log("click");
});

let check = () => {
    let allChars = "";
    checkBoxes.forEach((ch) => {
        if (ch.checked) {
            let password = "";
            if (ch.value == "uppercase") {
                allChars += upperCase;
                // console.log("Hello");
            }
            if (ch.value == "lowercase") {
                allChars += lowerCase;
            }
            if (ch.value == "numbers") {
                allChars += numbers;
            }
            if (ch.value == "symbols") {
                allChars += specialChars;
            }

            for (let index = 0; index < length; index++) {
                password += allChars[Math.floor(Math.random()*allChars.length)];
            }
            console.log("Password: ", String(password));
            Password1.value = password;
            // Password1.innerText = "hello";
        }
    });
    if (allChars == "") {
        alert("Check Some Boxes!");
    }
}

image.addEventListener("click", () => {
    Password1.select();
    document.execCommand("copy");
});