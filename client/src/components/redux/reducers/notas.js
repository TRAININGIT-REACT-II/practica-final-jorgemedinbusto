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
                    ...state.list.slice(0, action.index),
                    {
                        ...state.list[action.index],
                        title: action.note.title,
                        content: action.note.content
                    },
                    ...state.list.slice(action.index+1)
                ]
            }
        case actionTypes.DELETE_NOTE:
            return {
                list: [
                    ...state.list.slice(0, action.index),
                    ...state.list.slice(action.index + 1)
                ]
            }
        case actionTypes.GET_NOTES:
            return{ list: action.list };
        case actionTypes.SORT_NOTES:
            return {
                list:[
                    ...state.list.slice().sort(function(a, b) {
                        var nameA = a.title.toLowerCase(),
                        nameB = b.title.toLowerCase()
                        if (nameA < nameB)
                            return -1
                        if (nameA > nameB)
                            return 1
                        return 0
                    })
                ]
            }        
        default:
            return state;
    }
}

export default reducer;