import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

const getUsername = () => {
    return localStorage.getItem('username');
};

const checkAuthentication = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
};

export { isAuthenticated, getUsername, checkAuthentication };