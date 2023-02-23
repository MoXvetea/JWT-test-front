import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    // temporary states for profile creaction
    const [pseudo, setPseudo] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    // incorrect form entries
    const [redPassword, setRedPassword] = useState(false);
    const [redPassword2, setRedPassword2] = useState(false);
    const [redPseudo, setRedPseudo] = useState(false);
    const [redEmail, setRedEmail] = useState(false);


    const validateSignUp = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setRedPassword(true);
        } else if (password !== passwordConfirmation) {
            setRedPassword2(true);
        } else if (pseudo === undefined) {
            setRedPseudo(true);
        } else if (email === undefined) {
            setRedEmail(true)
        } else {
            let newProfile = {
                pseudo: pseudo,
                email: email,
                password: password,
            }
            await axios.post(`${process.env.REACT_APP_API_URL}api/register`, newProfile, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                    } else {
                        window.location = "/";
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            // temp state reset
            setPseudo();
            setEmail();
            setPassword();
            setPasswordConfirmation();
            newProfile = null;
        }
    }

    return (
        <div className='pageOrganisation'>
            <div className='featureFrame'>
                <h1>Formulaire d'inscription</h1>
                <form className='form'>
                    <input className={redPseudo ? 'red' : null}
                        onClick={(e) => setRedPseudo(false)}
                        placeholder='Pseudo'
                        autoComplete="username"
                        onChange={e => setPseudo(e.target.value)}
                        value={pseudo || ''}
                    />
                    <input className={redEmail ? 'red' : null}
                        type='email' placeholder='email'
                        autoComplete="email"
                        onClick={(e) => setRedEmail(false)}
                        onChange={e => setEmail(e.target.value)}
                        value={email || ''}
                    />
                    <input className={redPassword ? 'red' : null}
                        type='password' placeholder='mot de passe, 6 caractères minimun'
                        autoComplete="current-password"
                        onClick={(e) => setRedPassword(false)}
                        onChange={e => setPassword(e.target.value)}
                        value={password || ''}
                    />
                    <input className={redPassword2 ? 'red' : null}
                        type='password' placeholder='Confirmation mot de passe'
                        autoComplete="new-password"
                        onClick={(e) => setRedPassword2(false)}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        value={passwordConfirmation || ''}
                    />
                </form>
                <p className='accountValidation green' onClick={(e) => validateSignUp(e)}>Validation inscription</p>
                <Link className='linkButton' to={'/'} >
                    <p className='createAccount'>Retour</p>
                </Link>
            </div>
        </div>
    )
}

export default Register;

