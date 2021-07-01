// Pantalla de notas del usuario

//Libreria router
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
//Store
import store from "../redux/store"
import { useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../selectors/notes";
import { getUser } from "../selectors/user";
import { editNote } from "../redux/actions/notas";
import Token from "../contextos/token"
//Modal
import Modal from "../Modal"
//Errores
import Error from "../Errores/error";
import ErrorBoundary from "../Errores/ErrorBoundary";

const EditNote = () => {

    const notes = useSelector((state) => getNotes(state));
    const usuario = useSelector((state) => getUser(state));
    const dispatch = useDispatch();
    const location = useLocation();

    //Contexto para el token de usuario
    const {current} = useContext(Token);

    const [formState, setFormState] = useState({title:location.state.note.title,content:location.state.note.content});
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const modalText = useRef(null);

    //Error
    const [errorEditNote, setErrorEditNote] = useState({sendError: false, msg: ""});
    const updateEditNoteError = (mensaje) => {
        setErrorEditNote({ sendError: true, msg: mensaje });
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
            updateEditNoteError("El título no puede ser vacío");
        } else if (formState.content===null || formState.content===""){
            updateEditNoteError("El contenido no puede ser vacío");
        } else {
            fetch("/api/notes/"+location.state.note.id, 
            {
                method: "PUT",
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
                    const notaEditada = {
                        id:location.state.note.id,
                        title: formState.title,
                        content: formState.content,
                    }
                    dispatch(editNote(notaEditada, location.state.index));
                    modalText.current="La nota ha sido editada";
                    openModal();
                }
            } );
            setErrorEditNote({ sendError: false, msg: "" });
        }
    };
  
    return (
        <div className="text-center">
            <h1>Editar nota</h1>
            <label htmlFor="title">Título de la nota</label><br/>
            <input type="text" id="title"  value={formState.title} onChange={onChange("title")}></input><br/>
            <label htmlFor="content">Contenido de la nota</label><br/>
            <textarea type="text" id="content"  value={formState.content} onChange={onChange("content")}></textarea><br/>
            <button id="edidtNota" onClick={onClick}>Editar nota</button>
            
            <ErrorBoundary message={errorEditNote.msg}>
                <Error {...errorEditNote}></Error>
            </ErrorBoundary>

            <Modal show={showModal} onClose={closeModal}>
                <p>{modalText.current}</p>
                <button onClick={() => closeModal()}>Aceptar</button>
            </Modal>
        </div>
    );
  };
  
  export default EditNote;