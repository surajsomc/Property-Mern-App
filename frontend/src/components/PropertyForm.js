import { useState } from 'react';
import { usePropertyContext } from '../hooks/usePropertyContext';
import { useAuthContext } from '../hooks/useAuthContext';

const PropertyForm = () => {
    const {dispatch} = usePropertyContext();
    const {user} = useAuthContext();

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [err, setErr] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setErr('You must be logged in to add a property')
            return
        }

        const property = { name, address, city, state, zip }

        const res = await fetch('/api/properties', {
            method: 'POST',
            body: JSON.stringify(property),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            
        })

        const json = await res.json();

        if(!res.ok){
            setErr(json.err)
            setEmptyFields(json.emptyFields)
        }
        if(res.ok){
            setName('')
            setAddress('')
            setCity('')
            setState('')
            setZip('')
            setErr(null)
            setEmptyFields([])
            console.log('New property added', json)
            dispatch({type: 'CREATE_PROPERTY', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Property</h3>
            <label>Property Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />
            <label>Address:</label>
            <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className={emptyFields.includes('address') ? 'error' : ''}
            />
            <label>City:</label>
            <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className={emptyFields.includes('city') ? 'error' : ''}
            />
            <label>State:</label>
            <input
                type="text"
                onChange={(e) => setState(e.target.value)}
                value={state}
                className={emptyFields.includes('state') ? 'error' : ''}
            />
            <label>Zip:</label>
            <input
                type="number"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                className={emptyFields.includes('zip') ? 'error' : ''}
            />

            <button>Add Property</button>
            {err && <div className='error'>{err}</div>}
        </form>
            
    )
}

export default PropertyForm;