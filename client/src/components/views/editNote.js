// Pantalla de notas del usuario

//Libreria router
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
//Store
import store from "../redux/store"
import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../selectors/notes";
import { getUser } from "../selectors/user";
import { editNote } from "../redux/actions/notas";
import Token from "../contextos/token"

const EditNote = () => {

    const notes = useSelector((state) => getNotes(state));
    const usuario = useSelector((state) => getUser(state));
    const dispatch = useDispatch();
    const location = useLocation();

    //Contexto para el token de usuario
    const {current} = useContext(Token);

    const [formState, setFormState] = useState({title:location.state.note.title,content:location.state.note.content});

    const onChange = (key) => {
        
        return (e) => {
            setFormState({
                ...formState,
                [key] : e.target.value
            } );
        };
    };

    const onClick = () => {
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
                console.log("Error al editar la nota");
            }else{
                console.log("Se ha editado la nota correctamente");
                const notaEditada = {
                    id:location.state.note.id,
                    title: formState.title,
                    content: formState.content,
                }
                dispatch(editNote(notaEditada, location.state.index));
            }
         } );
    };
  
    return (
        <div>
            <h1>Editar nota</h1>
            <label htmlFor="title">Título de la nota</label><br/>
            <input type="text" id="title"  value={formState.title} onChange={onChange("title")}></input><br/>
            <label htmlFor="content">Contenido de la nota</label><br/>
            <textarea type="text" id="content"  value={formState.content} onChange={onChange("content")}></textarea><br/>
            <button id="edidtNota" onClick={onClick}>Editar nota</button>
        </div>
    );
  };
  
  export default EditNote;