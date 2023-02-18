import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { IdUserContext } from "./components/AppContext";
import Home from './screens/Home';
import Register from './screens/Register';
import Users from './screens/Users';
import Login from './screens/Login';


function App() {

  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      // await axios.get(`${process.env.REACT_APP_API_URL}jwtid`)
      await axios.get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true, credentials:'include'})
        .then((res) => {
          setIdUser(res.data);
          console.log("app........",idUser)
        })
        .catch((err) => console.log("No token front"));
    };
    fetchToken();
  },[idUser]);

  return (
    <div className='app'>
      <IdUserContext.Provider value={{idUser, setIdUser }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users' element={<Users />} />
      </Routes>
      </IdUserContext.Provider>

    </div>
  );
}

export default App;
