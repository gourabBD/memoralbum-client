import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loadings from '../../components/Spinners/Loadings';
import { AuthContext } from '../../contexts/AuthProvider';

const IsLoggedin = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
   
    if(loading){
        return <Loadings></Loadings>
    }
            if (user){
        return <Navigate to="/images" state={{from: location}} replace></Navigate>;
    }
          

   
        
   
};

export default IsLoggedin;