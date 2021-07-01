// Pantalla de notas del usuario

//Libreria router
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
//Store
import store from "../redux/store"
import { useSelector } from "react-redux";
import { getNotes } from "../selectors/notes";


const ShowNote = () => {

    const notes = useSelector((state) => getNotes(state));
    const params = useParams();
    const location = useLocation();
  
    return (
        <div className="text-center">
            <h2>{notes[location.state.id].title}</h2>
            <h3>{notes[location.state.id].content}</h3>
        </div>
    );
  };
  
  export default ShowNote;