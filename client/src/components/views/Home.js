// Pantalla de presentación

//Libreria router
import { BrowserRouter as Router, Link } from "react-router-dom";

const Home = () => {
  
    return (
        <div>
            <nav>
                <Link to="/newUser">Registrarse</Link>
            </nav>
            <nav>
                <Link to="/login">Iniciar Sesión</Link>
            </nav>
        </div>
    );
  };
  
  export default Home;