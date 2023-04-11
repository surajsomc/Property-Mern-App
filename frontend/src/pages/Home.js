import { useEffect } from 'react';
import { usePropertyContext } from '../hooks/usePropertyContext';
import { useAuthContext } from '../hooks/useAuthContext';


//components
import PropertyDetails from '../components/PropertyDetails';
import PropertyForm from '../components/PropertyForm';

const Home = () => {
    const {properties, dispatch} = usePropertyContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('/api/properties', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_PROPERTIES', payload: json})
            }
        }
        if(user){
            fetchProperties();
        }
    }, [dispatch, user]);



    return (
        <div className="home">
            <div className="propertes">
                {properties && properties.map((property) => (
                    <PropertyDetails key={property._id} property={property}/>

                ))}
            </div>
            <PropertyForm/>
        </div>
    );
};

export default Home;