// Pantalla de notas del usuario

//Libreria router
import { BrowserRouter as Router, Link } from "react-router-dom";
//Store
import store from "../redux/store"
import { useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../selectors/notes";
import { getUser } from "../selectors/user";
import { addNote } from "../redux/actions/notas";
import Token from "../contextos/token"
//Modal
import Modal from "../Modal"
//Errores
import Error from "../Errores/error";
import ErrorBoundary from "../Errores/ErrorBoundary";

const NewNote = () => {

    const notes = useSelector((state) => getNotes(state));
    const usuario = useSelector((state) => getUser(state));
    const dispatch = useDispatch();

    //Contexto para el token de usuario
    const {current} = useContext(Token);

    const [formState, setFormState] = useState({title:"",content:""});
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const modalText = useRef(null);

    //Error
    const [errorNewNote, setErrorNewNote] = useState({sendError: false, msg: ""});
    const updateNewNoteError = (mensaje) => {
        setErrorNewNote({ sendError: true, msg: mensaje });
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
        if(formState.title===null || formState.title===""){
            updateNewNoteError("El título no puede ser vacío");
        } else if (formState.content===null || formState.content===""){
            updateNewNoteError("El contenido no puede ser vacío");
        } else {
            fetch("/api/notes", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "api-token": current
                },
                body: JSON.stringify({title:formState.title,content:formState.content})
            })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if(json.error != null){
                    modalText.current=json.error;
                    openModal();
                }else{
                    dispatch(addNote(json));
                    modalText.current="Se ha creado la nota";
                    openModal();
                }
            } );
            setErrorNewNote({ sendError: false, msg: "" });
        }
    };
  
    return (
        <div className="text-center">
            <h1>Nueva nota</h1>
            <label htmlFor="title">Título de la nota</label><br/>
            <input type="text" id="title"  value={formState.title} onChange={onChange("title")}></input><br/>
            <label htmlFor="content">Contenido de la nota</label><br/>
            <textarea type="text" id="content"  value={formState.content} onChange={onChange("content")}></textarea><br/>
            <button id="newNota" onClick={onClick}>Crear nota</button>

            <ErrorBoundary message={errorNewNote.msg}>
                <Error {...errorNewNote}></Error>
            </ErrorBoundary>

            <Modal show={showModal} onClose={closeModal}>
                <p>{modalText.current}</p>
                <button onClick={() => closeModal()}>Aceptar</button>
            </Modal>
        </div>
        
    );
  };
  
  export default NewNote;