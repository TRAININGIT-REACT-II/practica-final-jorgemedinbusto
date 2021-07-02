import { useEffect, useState } from "react";

//Libreria router
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux"

//Componente
import PrivateRoute from "./components/PrivateRoute"

//Vistas
import Login from "./components/views/Login";
import NewUser from "./components/views/NewUser";
import Home from "./components/views/Home";
import NotFound from "./components/views/NotFound";
import Notas from "./components/views/Notas";
import ShowNote from "./components/views/showNote";
import EditNote from "./components/views/editNote";
import NewNote from "./components/views/newNote";

//Contextos
import Token from "./components/contextos/token"
import Tema from "./components/contextos/tema"

//Store
import store from "./components/redux/store"

import { THEMES } from "./components/constantes/temas";

import './bootstrap.css';
import './app.css';


// Componente principal de la aplicación.
const App = () => {
  const [current, setCurrent] = useState("");
  const [tema, setTema] = useState(THEMES.light);

  useEffect(() => {
    // En este caso, document.body no debe de mutar ya que React no
    // modifica dicho nodo. Por ello, es seguro acceder a el sin hacer
    // uso de referencias
    if (document.body.classList.value == "") {
      document.body.classList.add(tema);
      document.body.parentNode.classList.add(tema);
    } else {
      document.body.classList.replace(
        document.body.classList.value,
        tema
      );
      document.body.parentNode.classList.replace(
        document.body.parentNode.classList.value,
        tema
      );
    }

  }, [tema]);

  const onClick = (e) => {
    if (tema === "light") {
      setTema("dark");
      e.currentTarget.innerText = "Modo claro";
    } else {
      setTema("light");
      e.currentTarget.innerText = "Modo oscuro";
    }
  };

  // Mostramos la aplicación
  return (
    <Provider store={store}> 
      <Tema.Provider value={{tema, update: setTema}}>
        <Token.Provider value={{current, update: setCurrent}}>
          <Router>
            <main>
              <div className="col-md-12 tituloApp" >
                <h1 className="text-center">Práctica Curso React Avanzado</h1>
              </div>
              
              <div className="col-md-12 cabeceraEnlaces" style={{display:"flex", justifyContent:"space-around"}}>
                <nav>
                    <Link to="/">Inicio</Link>
                </nav>
                {(current === null || current === "") && 
                  <nav>
                    <Link to="/login">Iniciar Sesión</Link>
                  </nav>
                }
                {(current != "") &&
                  <nav>
                      <Link to="/newNote">Crear una nueva nota</Link>
                  </nav>
                }
                {(current != "") &&
                  <nav>
                      <Link to="/notes">Notas</Link>
                  </nav>
                }
                {(current === null || current === "") && 
                  <nav>
                    <Link to="/newUser">Nuevo Usuario</Link>
                  </nav>
                }
                <button onClick={onClick}>Modo oscuro</button>
              </div> 
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/login">
                  <Login/>
                </Route>
                <PrivateRoute path="/notes">
                  <Notas/>
                </PrivateRoute>
                <PrivateRoute path="/newNote">
                  <NewNote/>
                </PrivateRoute>
                <PrivateRoute path="/showNote">
                  <ShowNote/>
                </PrivateRoute>
                <PrivateRoute path="/editNote">
                  <EditNote/>
                </PrivateRoute>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </main>
          </Router>
        </Token.Provider>
      </Tema.Provider>
    </Provider>   
  );
};

export default App;
