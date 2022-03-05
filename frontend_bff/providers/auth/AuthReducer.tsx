import { IAuthAction, IAuthContext } from "../../types/types";

export const authReducer = (state:IAuthContext, action:IAuthAction):IAuthContext => {

    // const { username, isAdmin, accessToken, id } = action.payload; 
    console.log(state,action)
    
    switch(action.type){
        case "UPDATE_STATE":
            return {...action.payload}
        default: return state;
    }
} 