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

    const newUser = (res) => {
        console.log("Codigo de respuesta " + json.code);
        if(res.status === 400){
            //Modal el usuario ya existe
        } else if (res.status === 500){
            //Modal error al guardar la contraseña
        } else {
            //El usuario se ha mostrado correctamente
            //Guardar token
            //Redirigir a página de inicio de sesión o de notas de usuario
        }
    };

    const onClick = () => {
        console.log(formState.username + " " + formState.password);
        fetch("/api/register", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({username:formState.username,password:formState.password})
        })
        .then((res) => console.log(res));
    };
  
    return (
        <div>
            <label htmlFor="newUserText">Nombre de Usuario</label><br/>
            <input type="text" id="newUserText" value={formState.username} onChange={onChange("username")}></input><br/>
            <label htmlFor="newPassword">Contraseña</label><br/>
            <input type="password" id="newPassword" value={formState.password} onChange={onChange("password")}></input><br/>
            <button id="newUser" onClick={onClick}>Crear usuario</button>

            <nav>
                <Link to="/">Volver al inicio</Link>
            </nav>
        </div> 
    );
  };
  
  export default Status;