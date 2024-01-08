import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./formPage.scss";
import PassResetForm from "../../components/passResetForm/PassResetForm";
import { instance } from '../../axiosInstance';

const FormPage = () => {
    const [open, setOpen] = useState(false);
    //const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // Extracting params from the URL
        const path = location.pathname;
        const params = path.split('/');

        // Check if coming from "/reset-password/:uid/:token"
        if (path.startsWith('/reset-password')) {
            const uid = params[2]; // Extracting uid from URL
            const token = params[3]; // Extracting token from URL

            // Show the PassResetForm with the extracted uid and token
            // Pass these parameters to the PassResetForm component
            setOpen(true);

        }

        // Check if coming from "/confirm-email/:key"
        if (path.startsWith('/confirm-email')) {
            const key = params[2]; // Extracting key from URL
            console.log(key);

            // Redirect to the endpoint with the extracted key
        
            // window.location.href = `http://127.0.0.1:8000/registration/account-confirm-email/${key}/`;
            instance.post('/registration/account-confirm-email/', {key:key})
            .then((response) => {
                console.log(response);
                const responseData = response.data;
                console.log(responseData);
                if (responseData.key) { // If a key is returned, login was successful
                    console.log("test");
                    // Cookies.set('authToken', responseData.key, { expires: 1, path: '/' }); // Store the token in cookie with expiry of 1 day
                    // props.handleLogin(formData.username); // Call handleLogin function from props
                    // navigate('/dashboard'); // redirection to dashboard page
                }
                return response;
            })
        }
    }, [location.pathname]);

    return (
        <div className="home">
            {open && (
                <div className="passResetForm">
                    <PassResetForm setOpen={setOpen} />
                </div>
            )}
        </div>
    );
};

export default FormPage;
