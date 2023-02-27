import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DisplayUsers from '../components/DisplayUsers'
import instance from '../Api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))

    // Access token check
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instance.get('users', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchUsers();

    }, []);


    return (
        <div className='pageOrganisation'>
            <div className='featureFrame'>
                <div className='users'>
                    {users ? users.map(user => (
                        <DisplayUsers key={user._id} pseudo={user.pseudo} email={user.email} />
                    ))
                        : null}
                </div>
                <Link className='linkButton' to={'/'} >
                    <p className='createAccount'>Retour</p>
                </Link>
            </div>
        </div>
    )
}

export default Users
