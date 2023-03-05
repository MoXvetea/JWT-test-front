import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateLogin = (e) => {
        e.preventDefault();

        let loginInfo = {
            email: email,
            password: password,
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/login`, loginInfo, { withCredentials: true, credentials: 'include' })
            .then((res) => {
                    if (res.data.errors !== undefined){
                        res.data.errors.email?  alert(`error......${res.data.errors.email}`):alert(`error......${res.data.errors.password}`)
                } else {
                    const accessToken = res.data;
                    sessionStorage.setItem('accessToken', JSON.stringify(accessToken.accessToken));
                    window.location = "/";
                }
            })
            .catch((err) => {
                console.error(err);
            });
        setEmail();
        setPassword();
        loginInfo = null;
    };

    return (
        <div className='pageOrganisation'>
            <div className='featureFrame'>
                <h1>Connexion</h1>
                <form className='form'>
                    <input
                        type='email' placeholder='email'
                        autoComplete="username"
                        onChange={e => setEmail(e.target.value)}
                        value={email || ''}
                    />
                    <input
                        type='password'
                        placeholder='mot de passe, 6 caratères minimum'
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)}
                        value={password || ''}
                    />
                </form>
                <p className='accountValidation' onClick={(e) => validateLogin(e)}>Login</p>
                <Link className='linkButton' to={'/'} >
                    <p className='createAccount'>Retour</p>
                </Link>
            </div>
        </div >
    );
};

export default Login;



