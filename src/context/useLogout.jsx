import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const logout = () => {
        // Remove user from storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('User');
        localStorage.removeItem('username');
        
        // Dispatch logout action
        dispatch({ type: 'LOGOUT' });

        // Navigate to the homepage or login page
        navigate('/');
    };

    return { logout };
};
