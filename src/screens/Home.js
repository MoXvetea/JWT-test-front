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

    };
    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/logout`,
            withCredentials: true,
        })
            .then(() => {
                removeCookie("jwt")
                window.location = "/"
            })
            .catch((err) => console.log(err));

        window.location = "/";
    };
    return (
        <div className='pageOrganisation'>
            {idUser !== null ?
                (<div className='featureFrame'>
                    <h1>Déconnectez-vous</h1>
                    <p className='accountValidation' onClick={(e) => logout(e)}>Déconnexion</p>
                    <h1>Accès page utilisateurs</h1>
                    <Link className='accountCreation' to={'/Users'} >
                        <p className='createAccount green'>Entrer</p>
                    </Link>
                </div>)
                :
                (<div className='featureFrame'>
                    <h1>Connectez-vous</h1>
                    <Link className='accountCreation' to={'/login'} >
                        <p className='createAccount green'>Connexion</p>
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