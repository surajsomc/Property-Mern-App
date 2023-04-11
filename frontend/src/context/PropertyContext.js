import { createContext, useReducer} from "react";

export const PropertyContext = createContext();

export const propertyReducer = (state, action) => {
    switch(action.type){
        case 'SET_PROPERTIES':
            return {
                properties: action.payload
            }
        case 'CREATE_PROPERTY':
            return {
                properties: [action.payload, ...state.properties]
            }
        case 'DELETE_PROPERTY':
            return {
                properties: state.properties.filter((p) => p._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export const PropertyContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(propertyReducer, {
        properties: null
    });

    return(
        <PropertyContext.Provider value={{...state, dispatch}}>
            {children}
        </PropertyContext.Provider>
    )
}