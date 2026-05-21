const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    message.textContent = "Please enter both name and passcode.";
    return;
  }

  if (password.toLowerCase() === "sisterlove") {
    message.textContent = `Welcome, ${username}! Your tribute reel is ready.`;
    message.style.color = "#9fda80";
  } else {
    message.textContent = "Incorrect passcode. Try again with love.";
    message.style.color = "#f3b0bc";
  }
});
