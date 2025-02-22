const weakPasswords = [
    "password", "123456", "qwerty", "abc123", "letmein", "welcome"
];
export function validateForm(formData) {
    let errors = {};
    // Registration Number
    if (!formData.registrationNumber) {
        errors.registrationNumber = "Registration number is required.";
    }
    // Email validation
    if (!formData.email) {
        errors.email = "Email is required.";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Invalid email format.";
    }
    // Password validation
    if (!formData.password) {
        errors.password = "Password is required.";
    }
    else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            errors.password = "Password must have uppercase, lowercase, number, and special character.";
        }
        else if (weakPasswords.includes(formData.password.toLowerCase())) {
            errors.password = "This password is too common.";
        }
    }
    // Confirm Password
    if (formData.password && formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }
    // Phone validation
    if (!formData.phone) {
        errors.phone = "Phone is required.";
    }
    else if (!/^966[0-9]{9}$/.test(formData.phone)) {
        errors.phone = "Phone must be in the format 966xxxxxxxxx.";
    }
    // City, Region, Company Name, Business Type, and Zip Code
    if (!formData.city)
        errors.city = "City is required.";
    if (!formData.region)
        errors.region = "Region is required.";
    if (!formData.companyName)
        errors.companyName = "Company name is required.";
    if (!formData.businessType)
        errors.businessType = "Business type is required.";
    if (!formData.zipCode)
        errors.zipCode = "Zip code is required.";
    // Terms and Conditions
    if (!formData.termsAccepted)
        errors.termsAccepted = "You must accept the terms.";
    return errors;
}

