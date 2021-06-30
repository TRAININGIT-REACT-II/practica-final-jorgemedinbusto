// Pantalla de notas del usuario

//Libreria router
import { BrowserRouter as Router, Link } from "react-router-dom";
//Store
import store from "../redux/store"
import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../selectors/notes";
import { getUser } from "../selectors/user";
import { addNote } from "../redux/actions/notas";
import Token from "../contextos/token"

const NewNote = () => {

    const notes = useSelector((state) => getNotes(state));
    const usuario = useSelector((state) => getUser(state));
    const dispatch = useDispatch();

    //Contexto para el token de usuario
    const {current} = useContext(Token);

    const [formState, setFormState] = useState({title:"",content:""});

    const onChange = (key) => {
        
        return (e) => {
            setFormState({
                ...formState,
                [key] : e.target.value
            } );
        };
    };

    const onClick = () => {
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
                console.log("Error al crear la nota");
            }else{
                console.log("Se ha creado la nota correctamente");
                dispatch(addNote(json));
            }
         } );
    };
  
    return (
        <div>
            <h1>Nueva nota</h1>
            <label htmlFor="title">Título de la nota</label><br/>
            <input type="text" id="title"  value={formState.title} onChange={onChange("title")}></input><br/>
            <label htmlFor="content">Contenido de la nota</label><br/>
            <textarea type="text" id="content"  value={formState.content} onChange={onChange("content")}></textarea><br/>
            <button id="newNota" onClick={onClick}>Crear nota</button>
        </div>
    );
  };
  
  export default NewNote;