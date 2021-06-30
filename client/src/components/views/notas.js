// Pantalla de notas del usuario

//Libreria router
import { BrowserRouter as Router, Link } from "react-router-dom";
//Store
import store from "../redux/store"
import { useSelector } from "react-redux";
import { getNotes } from "../selectors/notes";
import { getUser } from "../selectors/user";



const Notas = () => {

    const notes = useSelector((state) => getNotes(state));
    const usuario = useSelector((state) => getUser(state));

    const editNote = (i) => {

    };

    const deleteNote = (i) => {

    };

    const showNote = (i) => {

    };
  
    return (
        <div>
            <h1>Listado de notas del usuario {usuario}</h1>
            <ul className="noteslist_list">
                {notes.map((note, i) => (
                <li
                    key={i}
                >
                    <a id={`note-${i}`}>
                        {note.title}
                        <button id={`edit-${i}`} onClick={editNote(i)}>Editar</button>
                        <button id={`delete-${i}`} onClick={deleteNote(i)}>Eliminar</button>
                        <button id={`show-${i}`} onClick={showNote(i)}>Mostrar</button>
                    </a>
                </li>
                ))}
            </ul>
            <nav>
                <Link to="/newNote">Crear una nueva nota</Link>
            </nav>

        </div>
    );
  };
  
  export default Notas;