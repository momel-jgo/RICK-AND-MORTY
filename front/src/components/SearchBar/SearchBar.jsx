import { useState } from "react";


function SearchBar({ onSearch }) {
   const [character, setcharacter] = useState('');
   
   const handleChange = (event) => {
      setcharacter(event.target.value);
   }

   return (
      <div>
         <input 
         type='search' 
         value={character}
         onChange={handleChange}
         />
         <button onClick={()=> onSearch(character)}>Agregar</button>
      </div>
   );
}

export default SearchBar;