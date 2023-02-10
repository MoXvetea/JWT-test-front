import { Link } from 'react-router-dom'

const Home = () => {

    return (


        <div className='userAndFavoriteField'>
            <div className='user'>
                <h1>Veuillez cliquer sur le bouton ci-dessous pour créer votre compte</h1>
                <Link className='accountCreation' to={'/'} >
                    <p className='createAccount'>Créer votre compte</p>
                </Link>
            </div>
        </div>
    )
}


export default Home