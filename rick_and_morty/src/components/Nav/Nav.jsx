import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const Nav = ({ onSearch }) => {
    return (
    <div>
        <nav>
            <Link to='/'>LOGOUT</Link>
            <hr/>
            <Link to='about'>About</Link>
            <hr/>
            <Link to='home'>Home</Link>
            <hr/>
            <SearchBar onSearch={onSearch}/>
        </nav>
    </div>
    )
}

export default Nav;