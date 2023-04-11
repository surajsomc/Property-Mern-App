import { useAuthContext } from "./useAuthContext";
import { usePropertyContext } from "./usePropertyContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: propertyDispatch } = usePropertyContext();

    const logout = () => {
        // remove user from local storage to log user out
        localStorage.removeItem('user');

        //dispatch logout action to auth context
        dispatch({type: 'LOGOUT'})
        propertyDispatch({type: 'SET_PROPERTIES', payload: null})
    }

    return{ logout}
}