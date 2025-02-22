import { Form } from "./components/Form.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    if (app) {
        new Form().render(app);
    }
});

// Find the button
const toggleButton = document.getElementById("toggleDarkMode");

// Check if dark mode is stored in localStorage (if present)
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
}

// When the button is pressed, we switch between the two modes.
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

// Save the current state to localStorage to remember it after reloading the page
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.removeItem("darkMode");
    }
});

