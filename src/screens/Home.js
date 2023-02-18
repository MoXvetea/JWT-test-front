import axios from 'axios'
import cookie from "js-cookie";
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { IdUserContext } from '../components/AppContext'

const Home = () => {
    const { idUser, setIdUser } = useContext(IdUserContext);

    // jwt deletion
    const removeCookie = (key) => {
        if (window !== "undefined") {
          cookie.remove(key, { expires: 1 });
        }


        // }
    };
    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/logout`,
            withCredentials: true,
        })
            .then(() => {removeCookie("jwt")
            window.location = "/"})
            .catch((err) => console.log(err));

        window.location = "/";
    };
    // const logout = async () => {
    //     await axios.get(`${process.env.REACT_APP_API_URL}api/logout`, { withCredential: true, credentials: 'include' })
    //         .then(() => {
    //             console.log('home remove');
    //             removeCookie('jwt')
    //             window.location = "/";
    //         })
    //         .catch((err) => console.log(err));
    //         console.log('home remove...........fail');
    //         // window.location = "/";
    // }

    return (
        <div className='pageOrganisation'>
            {idUser !== null ?
                (<div className='featureFrame'>
                    {console.log("app........id user......déco", idUser)}
                    <h1>Déconnectez-vous</h1>
                    <p className='accountValidation' onClick={(e) => logout(e)}>Déconnexion</p>
                    <h1>Accès page utilisateurs</h1>
                    <Link className='accountCreation' to={'/Users'} >
                        <p className='createAccount'>Entrer</p>
                    </Link>
                </div>)
                :
                (<div className='featureFrame'>
                    {console.log("app........id user......connexion", idUser)}
                    <h1>Connectez-vous</h1>
                    <Link className='accountCreation' to={'/login'} >
                        <p className='createAccount'>Connexion</p>
                    </Link>
                    <h1>Créez votre compte</h1>
                    <Link className='accountCreation' to={'/register'} >
                        <p className='createAccount'>Créer votre compte</p>
                    </Link>
                </div>)
            }
        </div>
    )
}


export default Home