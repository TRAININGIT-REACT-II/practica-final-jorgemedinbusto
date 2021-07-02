// Pantalla de notas del usuario

//Librerias
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useState, useRef } from "react";
import { useHistory } from "react-router";

//Store
import store from "../redux/store"

//Selectores
import { getNotes } from "../selectors/notes";
import { getUser } from "../selectors/user";

//Acciones
import { deleteNote, sortNotes } from "../redux/actions/notas";

//Contexto
import Token from "../contextos/token";

//Modal
import Modal from "../Modal"




const Notas = () => {

    // Estado de Redux
    const notes = useSelector((state) => getNotes(state));
    const usuario = useSelector((state) => getUser(state));

    //Dispatch para lanzar acciones
    const dispatch = useDispatch();

    //Contexto de token
    const {current} = useContext(Token);

    //Hook para manejar la ruta actual de la aplicación
    const history = useHistory();

    //Estado del modal
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    //Estado del modal confirm
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const openModalConfirm = (id, index) => {
        setIndex(index);
        setId(id);
        setShowModalConfirm(true);
    };
    const closeModalConfirm = () => setShowModalConfirm(false);
    const modalText = useRef(null);

    //Método que redirige a la pantalla de edición de una nota
    const editNote = (note, index) => {
        console.log("Metodo editNote");
        history.push("/editNote", {note:note, index: index });
    };

    //Método para eliminar una nota
    const removeNote = (id, index) => {
        console.log("Metodo delete");
        closeModalConfirm();
        fetch("/api/notes/"+id, 
        {
            method: "DELETE",
            headers: {
                "api-token": current
            },
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            if(json.error != null){
                modalText.current=json.error;
                openModal();
            }else{
                dispatch(deleteNote(index));
                modalText.current="Nota eliminada";
                openModal();
            }
         } );
         
    };

    //Método para mostrar el contenido de una nota
    const showNote = (index) => {
        console.log("Metodo showNote");
        history.push("/showNote", {id:index});
    };

    const [id, setId] = useState(null);
    const [index, setIndex] = useState(null);

    const ordenar = () => {
        dispatch(sortNotes());
    };
  
    return (
        <div className="text-center">
            <h1>Listado de notas del usuario {usuario}</h1>
            <nav>
                <Link to="/newNote">Crear una nueva nota</Link>
            </nav>
            <button onClick={() => ordenar()}>Ordenar</button>
            <div className="col-md-2"></div>
            <ul className="col-md-8 text-center">
                {notes.map((note, i) => (
                <li key={i} style={{listStyle:"none"}}>
                    <b className="col-md-3">{note.title}</b>
                    <button id={`edit-${i}`} className="col-md-3" onClick={() => editNote(note, i)}>Editar</button>
                    <button id={`delete-${i}`} className="col-md-3" onClick={() => openModalConfirm(note.id, i)}>Eliminar</button>
                    <button id={`show-${i}`}  className="col-md-3" onClick={() => showNote(i)}>Mostrar</button>
                </li>))}
            </ul>
            <div className="col-md-2"></div>
            <Modal show={showModalConfirm} onClose={closeModalConfirm}>
                <p>¿Desea eliminar la nota?</p>
                <button id={`confirm`} onClick={() => removeNote(id,index)}>Confirmar</button>
                <button id={`cancel`}  onClick={() => closeModalConfirm()}>Cancelar</button>
            </Modal>
            <Modal show={showModal} onClose={closeModal}>
                <p>{modalText.current}</p>
                <button onClick={() => closeModal()}>Aceptar</button>
            </Modal>
        </div>
    );
  };
  
  export default Notas;