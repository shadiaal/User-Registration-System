
export const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) throw new Error('Error fetching user data');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const submitFormData = async (formData) => {
    try {
        const response = await fetch("https://dummyjson.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Error submitting form data');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
