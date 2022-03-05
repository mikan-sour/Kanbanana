import React from 'react'
import LoginSignupController from '../components/login&signup/controller';
import AuthProvider from '../providers/auth';


function Signup() {

    return (
      <AuthProvider>
        <LoginSignupController type='signup'/>
      </AuthProvider> 
    )

  }
  
  export default Signup;