import { useState , useEffect } from 'react';
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import { Routes , Route , useLocation , useNavigate} from 'react-router-dom';
import Detail from './components/Detail/Detail';
import About from './components/About/About';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';


function App () {
  const location = useLocation();
  const [characters, setCharacters] = useState([])
  ///Esto pertenece al login
  const navigate = useNavigate()
  const [access , setAccess] = useState(false)
  const username = 'melliebuitrago@gmail.com'
  const password = 'Ellipse19'

  const login = (userData) =>{
    if(userData.username === username && userData.password === password){
      setAccess(true)
      navigate('/home')
    }
  }

  useEffect(() => {
    !access && navigate('/');
  },[access , navigate])

    const onSearch = (character) => {
      fetch(`http://localhost:3001/rickandmorty/character/${character}`)
        .then(response => response.json())
        .then(data => {
          if (data.id) {
            // Verificar que el personaje no se encuentre ya en el estado
            if (!characters.some(character => character.id === data.id)) {
              setCharacters(oldChars => [...oldChars, data]);
            } else {
              alert(`El personaje con ID '${data.id}' ya está en la lista.`);
            }
          }
        })
        //Maneja el error con los id inesistentes
        .catch(error => {
          alert(`No se encontró ningún personaje con el ID '${character}'.`);
        });
    };

  const onClose = (id) =>{
      setCharacters(
        characters.filter(character => character.id !== id)
      )
  }

  return (
    <div className='App' style={{ padding: '25px' }} >
    {location.pathname === '/' ? <Form  login={login}/> : <Nav  onSearch ={onSearch} />}
      <Routes>
        <Route   
          path='/'  element={<Cards onClose={onClose}  characters={characters}/>}
        />
        <Route path='/about' element={<About/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/detail/:detailID' element={<Detail/>}/>
      </Routes>      
    </div>
  )
}

export default App
