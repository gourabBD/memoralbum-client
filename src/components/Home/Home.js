import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import IsLoggedin from '../../Routes/PrivateRoute/IsLoggedin';
import Login from '../Login/Login';
import { Navigate, useLocation } from 'react-router-dom';
const Home = () => {
    const {user}=useContext(AuthContext)
    return (
        <div>

        {!user?.uid?<div>
<Login></Login>
        </div>:<Navigate to="/images"  replace></Navigate>}
        </div>
    );
};

export default Home;