import {createContext} from "react"

const Token = createContext({
    current: "",
    update: () => {}
});

export default Token;