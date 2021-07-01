// Pantalla de presentación

//Libreria router
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import Token from "../contextos/token";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/usuario";
//Modal
import Modal from "../Modal"

const Home = () => {

    const token = useContext(Token);
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const cerrarSesion = () => {
        token.update("");
        dispatch(logout());
        history.replace();
        openModal();
    };
  
    return (
        <div className="text-center">
            <h2>Bienvenido a la aplicación!</h2>
            {token.current != null && token.current != "" && <button id="logout" onClick={() => cerrarSesion()}>Cerrar Sesión</button>}

            <Modal show={showModal} onClose={closeModal}>
                <p>Se ha cerrado la sesión correctamente</p>
                <button onClick={() => closeModal()}>Aceptar</button>
            </Modal>
        </div>
    );
  };
  
  export default Home;