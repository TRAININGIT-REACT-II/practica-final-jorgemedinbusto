// Pantalla para crear un usuario
import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Status = () => {

    const [formState, setFormState] = useState({username:"",password:""});

    const onChange = (key) => {
        return (e) => {
            setFormState({
                ...formState,
                [key] : e.target.value
            } );
        };
    };

    const onClick = () => {
        console.log(formState.user + " " + formState.pass);
    }
  
    return (
        <div>
            <label htmlFor="newUserText">Nombre de Usuario</label><br/>
            <input type="text" id="newUserText" value={formState.user} onChange={onChange("username")}></input><br/>
            <label htmlFor="newPassword">Contraseña</label><br/>
            <input type="password" id="newPassword" value={formState.pass} onChange={onChange("password")}></input><br/>
            <button id="newUser" onClick={onClick}>Crear usuario</button>

            <nav>
                <Link to="/">Volver al inicio</Link>
            </nav>
        </div> 
    );
  };
  
  export default Status;