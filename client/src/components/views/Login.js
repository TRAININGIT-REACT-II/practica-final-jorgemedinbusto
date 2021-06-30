// Pantalla para iniciar sesión

import { useContext, useEffect, useState } from "react";
//Libreria router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router";
import Token from "../contextos/token";
import { useDispatch } from "react-redux";
import { saveUser } from "../redux/actions/usuario";
import store from "../redux/store"
import { getNotes } from "../redux/actions/notas";

const Status = () => {

    const [formState, setFormState] = useState({username:"",password:""});
    const [status, setStatus] = useState("");
    const token = useContext(Token);
    const history = useHistory();
    const dispatch = useDispatch();

    const onChange = (key) => {
        return (e) => {
            setFormState({
                ...formState,
                [key] : e.target.value
            } );
        };
    };

    useEffect(() => {
        getNotesFromUser();
    }, [token]);

    const getNotesFromUser = () => {
        fetch("/api/notes", 
        {
            method: "GET",
            headers: {
                "api-token":token.current
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            if(json.error != null){
                console.log(json.error);
            }else{
                console.log("Se han obtenido las notas");
                dispatch(getNotes(json));
            }
        });
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
            return res.json();
        })
        .then((json) => {
            if(json.error != null){
                console.log("Las credenciales son incorrectas");
            }else{
                console.log("Las credenciales son correctas");
                console.log("res.token ="+json.token);
                token.update(json.token);
                dispatch(saveUser(json.username));
            }
        });
    };
  
    return (
        <div className="col-3 center">
            <label htmlFor="newUserText">Nombre de Usuario</label><br/>
            <input type="text" id="idUser"  value={formState.username} onChange={onChange("username")}></input><br/>
            <label htmlFor="newPassword">Contraseña</label><br/>
            <input type="password" id="password"  value={formState.password} onChange={onChange("password")}></input><br/>
            <button id="login" onClick={onClick}>Iniciar Sesión</button>
        </div> 
    );
  };
  
  export default Status;