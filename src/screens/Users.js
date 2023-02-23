import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { IdUserContext } from '../components/AppContext'
import DisplayUsers from '../components/DisplayUsers'

const Users = () => {
    const { idUser } = useContext(IdUserContext);
    const [idVerif, setIdVerif] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // checks if login auth is still valid by comparison, if either one of the tokens value changes fetches token again
        const fetchToken = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true, credentials: 'include' })
                .then((res) => {
                    setIdVerif(res.data);
                })
                .catch((err) => {
                    console.log(err)
                    window.location = "/"
                })
            if (idUser === idVerif) {
                axios.get(`${process.env.REACT_APP_API_URL}api/users`)
                    .then(response => {
                        setUsers(response.data)
                    })
            }
        };
        fetchToken();
    }, [idVerif, idUser]);

    return (
        <div className='pageOrganisation'>
            <div className='featureFrame'>
                {/* checks if token has been fetched */}
            {(idVerif)  !== null ?
                <div className='users'>
                    {users ? users.map(user => (
                        <DisplayUsers key={user._id} pseudo={user.pseudo} email={user.email} />
                    ))
                        : null}
                </div>
                :
                <h1>Veuillez vous connecter</h1>}
                <Link className='linkButton' to={'/'} >
                    <p className='createAccount'>Retour</p>
                </Link>
            </div>
        </div>
    )
}

export default Users