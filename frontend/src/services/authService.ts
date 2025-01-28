import axios from 'axios';

export const registerUser = async (userData: { name: string; email: string; passwd: string }) => {

    try {
        const response = await axios.post('http://localhost:5000/api/persons', userData);

        if (response.status === 201) {
            console.log("response", response);
            return response.data;
        } else {
            throw new Error('Failed to register');
        }
    } catch (error) {
        console.error("Registration failed", error);
        throw error;
    }
}

export const loginUser = async (userData: { email: string, passwd: string }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/login', userData);

        if (response.status === 200) {
            const { name, email } = response.data.person;
            return { name, email };
        } else {
            throw new Error('Failed to log in');
        }
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};