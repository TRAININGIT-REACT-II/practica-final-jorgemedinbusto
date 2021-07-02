// Pantalla para crear un usuario
import { useState, useRef, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Token from "../contextos/token";
//Modal
import Modal from "../Modal"
//Errores
import Error from "../Errores/error";
import ErrorBoundary from "../Errores/ErrorBoundary";

const NewUser = () => {

    const [formState, setFormState] = useState({username:"",password:""});

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const token = useContext(Token);

    const modalText = useRef(null);

    //Error
    const [errorNewUser, setErrorNewUser] = useState({sendError: false, msg: ""});
    const updateNewUserError = (mensaje) => {
        setErrorNewUser({ sendError: true, msg: mensaje });
    };


    const onChange = (key) => {
        
        return (e) => {
            setFormState({
                ...formState,
                [key] : e.target.value
            } );
        };
    };

    const onClick = () => {
        console.log(formState.username + " " + formState.password);
        if(formState.username===null || formState.username===""){
            updateNewUserError("El nombre de usuario no puede ser vacío");
        } else if (formState.password===null || formState.password===""){
            updateNewUserError("La constraseña no puede ser vacía");
        } else {
            fetch("/api/register", 
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
                    modalText.current=json.error;
                    openModal();
                }else{
                    modalText.current="El usuario se ha creado correctamente";
                    openModal();
                    //token.update(json.token);
                    //dispatch(saveUser(json.username));
                }
            });
            setErrorNewUser({ sendError: false, msg: "" });
        }
    };
  
    return (
        <div className="text-center">
            <label htmlFor="newUserText">Nombre del nuevo usuario</label><br/>
            <input type="text" id="newUserText" value={formState.username} onChange={onChange("username")}></input><br/>
            <label htmlFor="newPassword">Contraseña</label><br/>
            <input type="password" id="newPassword" value={formState.password} onChange={onChange("password")}></input><br/>
            <button id="newUser" onClick={onClick}>Crear usuario</button>

            <ErrorBoundary message={errorNewUser.msg}>
                <Error {...errorNewUser}></Error>
            </ErrorBoundary>

            <Modal show={showModal} onClose={closeModal}>
                <p>{modalText.current}</p>
                <button id={`cancel`}  onClick={() => closeModal()}>Aceptar</button>
            </Modal>
        </div> 
    );
  };
  
  export default NewUser;