// Pantalla para iniciar sesión

//Libreria router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Status = () => {
  
    return (
        <div>
            <input type="text" id="idUser"></input><br/>
            <input type="password" id="password"></input><br/>
            <button id="login">Iniciar Sesión</button>

            <nav>
                <Link to="/newUser">Crear nuevo usuario</Link>
            </nav>
        </div> 
    );
  };
  
  export default Status;