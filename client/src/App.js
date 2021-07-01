import { useEffect, useState } from "react";

//Libreria router
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider, useDispatch } from "react-redux"

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

//Store
import store from "./components/redux/store"

import './bootstrap.css';
import './app.css';


// Componente principal de la aplicación.
const App = () => {
  const [current, setCurrent] = useState("");

  //Usar Context para guardar Token de usuario

  // Mostramos la aplicación
  return (
    <Provider store={store}> 
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
              <nav>
                  <Link to="/newNote">Crear una nueva nota</Link>
              </nav>
              <nav>
                  <Link to="/notes">Notas</Link>
              </nav>
              {(current === null || current === "") && 
                <nav>
                  <Link to="/newUser">Nuevo Usuario</Link>
                </nav>
              }
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
    </Provider>   
  );
};

export default App;
