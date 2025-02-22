import { Form } from "./components/Form.js";


document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    if (app) {
        new Form().render(app);
    }
});

