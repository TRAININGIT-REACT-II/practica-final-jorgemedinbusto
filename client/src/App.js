import { useEffect, useState } from "react";
import Status from "./components/Status";

//Libreria router
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Vistas
import Login from "./components/views/Login";
import NewUser from "./components/views/NewUser";
import Home from "./components/views/Home";
import NotFound from "./components/views/NotFound";

//Contextos
import Token from "./components/contextos/Token"

// Componente principal de la aplicación.
const App = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  //Usar Context para guardar Token de usuario

  // Mostramos la aplicación
  return (
    <Token.Provider value={{current:token, update: setToken}}>
      <Router>
        <main>
          <h1>Práctica Final React Avanzado</h1>
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
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>
    </Token.Provider>

    
  );
};

export default App;
