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
        console.log('Users...............useeffect ');
        const fetchToken = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true, credentials: 'include' })
                .then((res) => {
                    setIdVerif(res.data);
                    console.log('page User.................idverif ', idVerif);
                    console.log("app........idUser", idUser)
                })
                .catch((err) => console.log("No token front"));
        };
        fetchToken();
        },[idVerif]);

        // if (idVerif === idUser) {

            // axios.get(`${process.env.REACT_APP_API_URL}api/users`, { withCredential: true, credentials: 'include' })
            //     .then(response => {
            //         console.log(response.data);
            //         setUsers(response.data)
            //     })
        // } else {
        //     window.location = "/"
        // }
        // }, [])
    // }, [idVerif, idUser]);

    return (
        <div className='pageOrganisation'>
            <div className='featureFrame'>
                <div className='users'>
                    {/* {console.log('users page................',users)} */}
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