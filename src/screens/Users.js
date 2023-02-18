import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DisplayUsers from '../components/DisplayUsers'

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log('ok user');
        axios.get(`${process.env.REACT_APP_API_URL}api/users`, { withCredential: true, credentials: 'include' })
            .then(response => {
                console.log(response.data);
                setUsers(response.data)
            })
    }, [])

    return (
        <div className='pageOrganisation'>
            <div className='featureFrame'>
                <div className='users'>
                    {users ? users.map(user => (
                        <DisplayUsers key={user.id} pseudo={user.pseudo} email={user.email} />
                    ))
                        : null}
                </div>

                <Link className='accountCreation' to={'/'} >
                    <p className='createAccount'>Retour</p>
                </Link>
            </div>
        </div>
    )
}

export default Users