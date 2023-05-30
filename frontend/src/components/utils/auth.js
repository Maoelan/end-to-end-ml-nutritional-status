import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

const getUsername = () => {
    const username = localStorage.getItem('username');
    return username;
};

const checkAuthentication = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
};

export { isAuthenticated, getUsername, checkAuthentication };