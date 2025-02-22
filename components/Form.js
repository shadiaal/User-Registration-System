import { validateForm } from "../utils/validation.js"; 
import { fetchUserData, submitFormData } from "../services/api.js"; 

// Function to show the spinner
function showLoading() {
    const loadingSpinner = document.getElementById("loadingSpinner");
    loadingSpinner.classList.remove("hidden");
}

// Function to hide the spinner
function hideLoading() {
    const loadingSpinner = document.getElementById("loadingSpinner");
    loadingSpinner.classList.add("hidden");
}
export class Form {
    constructor() {
        this.form = document.createElement("form");
        this.form.id = "registrationForm";
        this.form.classList.add("p-10", "bg-white", "shadow-2xl", "rounded-lg", "max-w-9xl", "mx-auto", "space-y-8", "mb-20", "animate__animated", "animate__fadeIn");
        this.form.innerHTML = `
            <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">Register Your Company</h2>

            <!-- Company Information -->
            <fieldset class="mb-6">
                <legend class="text-lg font-semibold text-gray-700">Company Information</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                        <label class="block text-gray-700">Business Type</label>
                        <select name="businessType" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                            <option value="">Select Business Type</option>
                            <option value="Technology">Technology</option>
                            <option value="Corporation">Corporation</option>
                            <option value="Health">Health</option>
                        </select>
                        <span class="error text-red-500 text-sm" id="businessTypeError"></span>
                    </div>
                    <div>
                        <label class="block text-gray-700">Company Name</label>
                        <input type="text" name="companyName" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                        <span class="error text-red-500 text-sm" id="companyNameError"></span>
                    </div>
                    <div>
                        <label class="block text-gray-700">Commercial Registration Number</label>
                        <input type="text" name="registrationNumber" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                        <span class="error text-red-500 text-sm" id="registrationNumberError"></span>
                    </div>
                </div>
            </fieldset>

            <!-- Security -->
            <fieldset class="mb-6">
                <legend class="text-lg font-semibold text-gray-700">Security</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                        <label class="block text-gray-700">Password</label>
                        <input type="password" name="password" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                        <span class="error text-red-500 text-sm" id="passwordError"></span>
                    </div>
                    <div>
                        <label class="block text-gray-700">Confirm Password</label>
                        <input type="password" name="confirmPassword" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                        <span class="error text-red-500 text-sm" id="confirmPasswordError"></span>
                    </div>
                </div>
            </fieldset>

            <!-- Contact Information -->
            <fieldset class="mb-6">
                <legend class="text-lg font-semibold text-gray-700">Contact Information</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                        <label class="block text-gray-700">Email</label>
                        <input type="email" name="email" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                        <span class="error text-red-500 text-sm" id="emailError"></span>
                    </div>
                    <div>
                        <label class="block text-gray-700">Phone</label>
                        <input type="text" name="phone" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                        <span class="error text-red-500 text-sm" id="phoneError"></span>
                    </div>
                </div>
            </fieldset>

            <!-- Address -->
            <fieldset class="mb-6">
                <legend class="text-lg font-semibold text-gray-700">Address</legend>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div>
                        <label class="block text-gray-700">City</label>
                        <select name="city" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                            <option value="">Select City</option>
                            <option value="Riyadh">Riyadh</option>
                            <option value="Jeddah">Jeddah</option>
                            <option value="Dammam">Dammam</option>
                            
                        </select>
                        <span class="error text-red-500 text-sm" id="cityError"></span>
                    </div>
                    <div>
                        <label class="block text-gray-700">Region</label>
                        <select name="region" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                            <option value="">Select Region</option>
                            <option value="Central">Central</option>
                            <option value="Western">Western</option>
                            <option value="Eastern">Eastern</option>
                        </select>
                        <span class="error text-red-500 text-sm" id="regionError"></span>
                    </div>
                    <div>
                        <label class="block text-gray-700">Zip Code</label>
                        <input type="text" name="zipCode" class="input-field focus:outline-none focus:border-transparent focus:ring-4 focus:ring-green-300 transition-all duration-300">
                        <span class="error text-red-500 text-sm" id="zipCodeError"></span>
                    </div>
                </div>
            </fieldset>

            <!-- Terms and Conditions -->
            <div class="flex items-center gap-2">
                <input type="checkbox" name="termsAccepted" id="termsAccepted">
                <label for="termsAccepted" class="text-gray-700">I accept the terms and conditions</label>
                <span class="error text-red-500 text-sm" id="termsAcceptedError"></span>
            </div>

            <!-- Buttons -->
            <div class="flex justify-between mt-6">
                <button type="button" class="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-100">Cancel</button>
                <button type="submit" id="registerBtn" class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-200">Register</button>
            </div>
        `;
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
        this.addFocusEffects();
        this.addRealTimeValidation();
        // Fetch and pre-fill the form data
        window.addEventListener('load', () => {
            this.fetchData();
        });
    }


  
    async fetchData() {
        try {
            showLoading();  // Show the spinner at the start of the call
            const users = await fetchUserData(1); 
            if (users) {
             // Fill the fields with data taken from the API
             this.form.querySelector('[name="companyName"]').value = users.company.name || '';
                this.form.querySelector('[name="email"]').value = users.email || '';
                this.form.querySelector('[name="phone"]').value = users.phone || '';
                this.form.querySelector('[name="password"]').value = users.password || '';
                this.form.querySelector('[name="confirmPassword"]').value = users.password || '';
                this.form.querySelector('[name="registrationNumber"]').value = users.ssn || '';

                this.form.querySelector('[name="city"]').value = "Riyadh"; 
                this.form.querySelector('[name="region"]').value = "Central"; 
                this.form.querySelector('[name="zipCode"]').value = users.company.address.postalCode || ''; 
           
        }
            
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }finally {
            hideLoading(); // Hide the spinner after the process is complete
        }
    }

    addFocusEffects() {
        const inputFields = this.form.querySelectorAll(".input-field");
        inputFields.forEach(input => {
            input.classList.add("w-full", "border", "p-3", "rounded-lg", "shadow-sm", "focus:ring-2", "focus:ring-blue-500", "transition", "duration-200");
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const formattedData = Object.fromEntries(formData.entries());
        formattedData.termsAccepted = this.form.querySelector('[name="termsAccepted"]').checked ? "true" : "";

        const errors = validateForm(formattedData);
        document.querySelectorAll(".error").forEach(errorSpan => errorSpan.textContent = "");
        let hasErrors = false;
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}Error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
                hasErrors = true;
            }
        });

        if (!hasErrors) {
            submitFormData(formattedData)
                .then(response => {
                    alert("Form submitted successfully!");
                    this.form.reset();
                })
                .catch(error => {
                    alert("Failed to submit form.");
                });
        }
    }

    render(parent) {
        parent.appendChild(this.form);
    }

    addRealTimeValidation() {
        this.form.querySelectorAll(".input-field, #termsAccepted").forEach(input => {
            input.addEventListener("input", () => {
                const fieldName = input.getAttribute("name");
                const formData = new FormData(this.form);
                const formattedData = Object.fromEntries(formData.entries());
                const errors = validateForm(formattedData);
                const errorElement = document.getElementById(`${fieldName}Error`);
                if (errorElement) {
                    errorElement.textContent = errors[fieldName] || "";
                }
            });
        });
    }
    
}



