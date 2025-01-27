import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout=()=>{
    const {dispatch} =useAuthContext()
    const logout=()=>{
        //remove user form storage
        localStorage.removeItem('accessToken')
        
        //dispatch logout  action

        dispatch({type:'LOGOUT'})
    }
    return {logout}
}

module.exports=useLogout