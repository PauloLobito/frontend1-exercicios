let btn = document.getElementById("btn_submit");
let passwordInput = document.getElementById("password");
let result = document.getElementById("result");
btn.addEventListener("click", function () {
  let password = passwordInput.value;
  localStorage.setItem("password", btoa(password));
  let pass = atob(localStorage.getItem("password"));
  result.innerHTML = `Senha armazenada: ${pass}`;


});
