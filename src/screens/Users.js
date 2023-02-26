import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { IdUserContext } from '../components/AppContext'
import DisplayUsers from '../components/DisplayUsers'
import instance from '../api';

const Users = () => {
    const { idUser } = useContext(IdUserContext);
    const [users, setUsers] = useState([]);
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))

    useEffect(() => {
        console.log('idUser:', idUser);
        if (idUser !== (null && undefined)){
        const fetchUsers = async () => {
            try {
                console.log('users try before interception');
                const response = await instance.get('users', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('error.......', error.message);
                // sessionStorage.removeItem('accessToken');
                window.location = '/users';
            }
        };
    fetchUsers();}
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
                {/* {(idVerif)  !== null ?
                <div className='users'>
                {users ? users.map(user => (
                    <DisplayUsers key={user._id} pseudo={user.pseudo} email={user.email} />
                    ))
                    : null}
                    </div>
                    :
                <h1>Veuillez vous connecter</h1>} */}
                <Link className='linkButton' to={'/'} >
                    <p className='createAccount'>Retour</p>
                </Link>
            </div>
        </div>
    )
}

export default Users


// const fetchToken = async () => {
// await axios.get(`${process.env.REACT_APP_API_URL}users`, {headers: {
    //     Authorization: `Bearer ${accessToken}`}
    // } )
    // .then((res) => {
        //     setUsers(res.data);
                // })
                // .catch((err) => {
                    //     sessionStorage.removeItem('accessToken')
                //     console.error('error.......',err.message)
                //     window.location = "/"
                // })
                //     };
                //     fetchToken();
                // }, []);