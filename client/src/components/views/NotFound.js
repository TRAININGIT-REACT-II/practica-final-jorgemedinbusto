// Pantalla Error 404 Not Found

import { BrowserRouter as Router, Link } from "react-router-dom";

const NotFound = () => {
  
    return (
        <div>
            <h2>No existe nada en esta ruta</h2>
            <nav>
                <Link to="/">Volver al inicio</Link>
            </nav>
        </div> 
    );
  };
  
  export default NotFound;