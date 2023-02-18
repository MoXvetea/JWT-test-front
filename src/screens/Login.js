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
        axios.post(`${process.env.REACT_APP_API_URL}api/login`, loginInfo, { withCredentials: true, credentials: 'include' })
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    console.log(res.data.errors.email);
                    console.log(res.data.errors.password);
                } else {
                    console.log('okk axios login front');
                    window.location = "/";
                }
            })
            .catch((err) => {
                console.log(err);
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
                        onChange={e => setEmail(e.target.value)}
                        value={email || ''}
                    />
                    <input
                        type='password'
                        placeholder='mot de passe, 6 caratères minimum'
                        onChange={e => setPassword(e.target.value)}
                        value={password || ''}
                    />
                </form>
                <p className='accountValidation' onClick={(e) => validateLogin(e)}>Login</p>
                <Link className='accountCreation' to={'/'} >
                    <p className='createAccount'>Retour</p>
                </Link>
            </div>
        </div >
    );
};

export default Login;



