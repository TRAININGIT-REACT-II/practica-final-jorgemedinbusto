import { useContext } from "react";
import { Redirect, Route } from "react-router";
import Token from "./contextos/token"

const PrivateRoute =({children, ...others}) => {

    const {current} = useContext(Token);

    return(
        <Route
            {...others}
            render={() => {
                if(current != ""){
                    return children;
                } else {
                    return ( <Redirect to="/login" />);
                }
                
            }}
        />
    );

}

export default PrivateRoute;
