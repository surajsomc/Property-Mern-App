import { usePropertyContext } from "../hooks/usePropertyContext";
import { useAuthContext } from "../hooks/useAuthContext";


//date fns
import {formatDistanceToNow } from 'date-fns';


const PropertyDetails = ({ property }) => {
    const {dispatch} = usePropertyContext();
    const {user} = useAuthContext();

    const handleClick = async () => {
        if(!user){
            return
        }


        const response = await fetch(`https://real-estate-app-o33o.onrender.com/api/properties/`+property._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Access-Control-Allow-Origin': '*'
            }
        });
        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_PROPERTY', payload: json})
        }
    }

    return (
        <div className="property-details">
            <h4>{property.name}</h4>
            <p><strong>Address: </strong>{property.address}, {property.city}, {property.state} {property.zip}</p>
            <p>{formatDistanceToNow(new Date(property.createdAt), {addSuffix:true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}

export default PropertyDetails;