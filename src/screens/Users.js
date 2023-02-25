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
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))
    
    useEffect(() => {

        const fetchToken = async () => {
            console.log(accessToken);
            await axios.get(`${process.env.REACT_APP_API_URL}users`, {headers: {
                // await axios.get(`${process.env.REACT_APP_API_URL}check`, {headers: {
                Authorization: `Bearer ${accessToken}`}
            } )
            .then((res) => {
                console.log("users=", res.data);

                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err)
                window.location = "/"
            })
                };
                fetchToken();
            }, [idVerif, idUser]);
            
            return (
                <div className='pageOrganisation'>
            <div className='featureFrame'>
                {/* checks if token has been fetched */}
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

// import axios from 'axios';

// const API_URL = 'https://example.com/api';

// const accessToken = 'your-access-token';

// axios.get(`${API_URL}/resource`, {
//   headers: {
//     Authorization: `Bearer ${accessToken}`
//   }
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error);
// });