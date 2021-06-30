import actionTypes from "../actionTypes";


const estadoInicial = {
    username:"",
};

const reducer = (state = estadoInicial, action) => {
    switch(action.type){
        case actionTypes.LOGIN:
            return {
                username: action.username
            };
        default:
            return state;
    }
}

export default reducer;

