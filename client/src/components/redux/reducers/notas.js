import actionTypes from "../actionTypes";

const estadoInicial = {
    list: []
};

const reducer = (state = estadoInicial, action) => {
    switch(action.type){
        case actionTypes.ADD_NOTE:
            return {
                list: [
                    ...state.list,
                    {
                        id: action.note.id,
                        title: action.note.title,
                        content: action.note.content,
                    }
                ]
            };
        case actionTypes.EDIT_NOTE:
            return {
                list: [
                    ...state.list.splice(0, action.index),
                    {
                        ...state.list[action.id],
                        title: action.title,
                        content: action.content,
                        author: action.author
                    },
                    ...state.list.splice(action.id+1)
                ]
            }
        case actionTypes.DELETE_NOTE:
            return {
                list: [
                    ...state.list.splice(0, action.id),
                    ...state.list.splice(action.id+1)
                ]
            }
        case actionTypes.GET_NOTES:
            return{ list: action.list };
                action.list
        default:
            return state;
    }
}

export default reducer;