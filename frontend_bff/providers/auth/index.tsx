import React from 'react';
import { IAuthContext, IAuthAction } from '../../types/types';
import { authReducer } from './AuthReducer';

const initialState:IAuthContext = {
    username:'',
    isAdmin:false,
    id:'',
    accessToken:''
}

export const AuthContext = React.createContext<{
    state:IAuthContext,dispatch:React.Dispatch<IAuthAction>
}>({
    state:initialState,
    dispatch:authReducer as unknown as React.Dispatch<IAuthAction>
})

const AuthProvider:React.FC<{}> = ({children}) => {
    const [state, dispatch ] = React.useReducer( authReducer, initialState);
    const contextValue = React.useMemo(()=> {
        return {state, dispatch}
    },[state,dispatch]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;