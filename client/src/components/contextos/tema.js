import {createContext} from "react"
import { THEMES } from "../constantes/temas";

const Tema = createContext({
    current: THEMES.light,
    update: () => {}
});

export default Tema;