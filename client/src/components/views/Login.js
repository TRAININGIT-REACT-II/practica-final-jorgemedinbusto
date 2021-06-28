// Pantalla para iniciar sesión

import { useContext, useState } from "react";
//Libreria router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router";
import Token from "../../components/contextos/Token"

const Status = () => {

    const [formState, setFormState] = useState({username:"",password:""});
    const [status, setStatus] = useState("");
    const token = useContext(Token);
    const history = useHistory();

    const onChange = (key) => {
        return (e) => {
            setFormState({
                ...formState,
                [key] : e.target.value
            } );
        };
    };

    const login = (res) => {
        if(status != 200){
            //Mostrar error de usuario incorrecto
            console.log("Las credenciales son incorrectas")
        }else{
            token.update(res.token);
            history.push("/api/notes");
        }
    };

    const onClick = () => {
        console.log(formState.username + " " + formState.password);
        fetch("/api/login", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({username:formState.username,password:formState.password})
        })
        .then((res) => {
            setStatus(res.status);
            return res.json();
        })
        .then((res) => {
            login(res);
        });
    };
  
    return (
        <div className="col-3 center">
            <label htmlFor="newUserText">Nombre de Usuario</label><br/>
            <input type="text" id="idUser"  value={formState.username} onChange={onChange("username")}></input><br/>
            <label htmlFor="newPassword">Contraseña</label><br/>
            <input type="password" id="password"  value={formState.password} onChange={onChange("password")}></input><br/>
            <button id="login" onClick={onClick}>Iniciar Sesión</button>

            <nav>
                <Link to="/newUser">Crear nuevo usuario</Link>
            </nav>
        </div> 
    );
  };
  
  export default Status;