// Pantalla de notas del usuario

//Libreria router
import { BrowserRouter as Router, Link } from "react-router-dom";
//Store
import store from "../redux/store"

import { useContext } from "react";
import { getNotes } from "../selectors/notes";
import { getUser } from "../selectors/user";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../redux/actions/notas";

import Token from "../contextos/token";

//
import { useHistory } from "react-router";



const Notas = () => {

    const notes = useSelector((state) => getNotes(state));
    const usuario = useSelector((state) => getUser(state));

    const dispatch = useDispatch();

    const {current} = useContext(Token);

    const history = useHistory();

    const editNote = (note, index) => {
        console.log("Metodo editNote");
        history.push("/editNote", {note:note, index: index });
    };

    const removeNote = (id, index) => {
        console.log("Metodo delete");
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
                console.log("Error al eliminar la nota");
            }else{
                console.log("Se ha eliminado la nota correctamente");
                dispatch(deleteNote(index));
            }
         } );
    };

    const showNote = (index) => {
        console.log("Metodo showNote");
        history.push("/showNote", {id:index});
    };
  
    return (
        <div>
            <h1>Listado de notas del usuario {usuario}</h1>
            <nav>
                <Link to="/newNote">Crear una nueva nota</Link>
            </nav>
            <ul className="noteslist_list">
                {notes.map((note, i) => (
                <li
                    key={i}
                >
                    <a id={`note-${i}`}>
                        {note.title}
                        <button id={`edit-${i}`} onClick={() => editNote(note, i)}>Editar</button>
                        <button id={`delete-${i}`} onClick={() => removeNote(note.id,i)}>Eliminar</button>
                        <button id={`show-${i}`}  onClick={() => showNote(i)}>Mostrar</button>
                    </a>
                </li>
                ))}
            </ul>
        </div>
    );
  };
  
  export default Notas;