let nome = JSON.parse(localStorage.getItem("name"));
console.log(nome);
let nameInput = document.getElementById("name");
let buttonToggleForm = localStorage.getItem("toggleForm");
let theme =localStorage.getItem("theme"); 
let themeButton = document.getElementById("theme-button");

theme ? (themeButton.innerText = theme) : (themeButton.innerText = "Light Mode");

themeButton.addEventListener("click", function() {
    if (theme === "Light Mode") {
        localStorage.setItem("theme", "Dark Mode");
        theme = "Dark Mode";
        themeButton.innerText = "Dark Mode";
    } else {
        localStorage.setItem("theme", "Light Mode");
        theme = "Light Mode";
        themeButton.innerText = "Light Mode";
    }
});




buttonToggleForm.addEventListener("submit", function() {
    localStorage.setItem("name", JSON.stringify(nameInput.value));
});


