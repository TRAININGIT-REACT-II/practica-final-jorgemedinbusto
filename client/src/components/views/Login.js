// Pantalla para iniciar sesión

import { useContext, useEffect, useState, useRef } from "react";
//Libreria router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router";
import Token from "../contextos/token";
import { useDispatch } from "react-redux";
import { saveUser } from "../redux/actions/usuario";
import store from "../redux/store"
import { getNotes } from "../redux/actions/notas";

//Modal
import Modal from "../Modal"

//Errores
import Error from "../Errores/error";
import ErrorBoundary from "../Errores/ErrorBoundary";

const Login = () => {

    const [formState, setFormState] = useState({username:"",password:""});
    const [status, setStatus] = useState("");
    const token = useContext(Token);
    const history = useHistory();
    const dispatch = useDispatch();
    const modalText = useRef(null);

    //Modal
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        history.push("/notes");
    }
    

    //Error
    const [errorLogin, setErrorLogin] = useState({sendError: false, msg: ""});

    const updateLoginError = (mensaje) => {
        setErrorLogin({ sendError: true, msg: mensaje });
    };

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
        if(formState.username===null || formState.username===""){
            updateLoginError("El nombre de usuario no puede ser vacío");
        } else if (formState.password===null || formState.password===""){
            updateLoginError("La constraseña no puede ser vacía");
        } else {
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
                    modalText.current="Las credenciales son incorrectas";
                    openModal();
                }else{
                    token.update(json.token);
                    dispatch(saveUser(json.username));
                    modalText.current="Se ha iniciado sesión correctamente";
                    openModal();
                }
            });
            setErrorLogin({ sendError: false, msg: "" });
        }
        
    };
  
    return (
        <div className="text-center">
            <label htmlFor="newUserText">Nombre de Usuario</label><br/>
            <input type="text" id="idUser"  value={formState.username} onChange={onChange("username")}></input><br/>
            <label htmlFor="newPassword">Contraseña</label><br/>
            <input type="password" id="password"  value={formState.password} onChange={onChange("password")}></input><br/>
            <button id="login" onClick={onClick}>Iniciar Sesión</button>

            <ErrorBoundary message={errorLogin.msg}>
                <Error {...errorLogin}></Error>
            </ErrorBoundary>
            
            <Modal show={showModal} onClose={closeModal}>
                <p>{modalText.current}</p>
                <button id={`cancel`}  onClick={() => closeModal()}>Aceptar</button>
            </Modal>
        </div> 
    );
  };
  
  export default Login;