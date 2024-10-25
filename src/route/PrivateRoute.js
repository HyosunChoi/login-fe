import React from 'react'
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({user, children}) => {    
  return user? children:<Navigate to = "/login" />;
};

//user값이 있으면 todopage : 없으면 redirets to login
export default PrivateRoute
