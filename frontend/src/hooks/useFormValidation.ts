
import { useState } from "react";

interface RegistrationFormValues {
    name: string;
    email: string;
    passwd: string;
}

interface SignInFormValues {
    email: string;
    passwd: string;
}

type FormValues = RegistrationFormValues | SignInFormValues;

const useFormValidation = <T extends FormValues>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);
    const [validated, setValidated] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if ('name' in values) {
            return values.name && values.email && values.passwd;
        } else {
            return values.email && values.passwd;
        }
    };

    return {
        values,
        setValues,
        validated,
        setValidated,
        handleChange,
        validateForm,
    };
};

export default useFormValidation;
