import actionTypes from "../actionTypes";

export const addNote = (note) => ({
    type: actionTypes.ADD_NOTE,
    note
});

export const editNote = (note) => ({
    type: actionTypes.EDIT_NOTE,
    note
});

export const deleteNote = (id) => ({
    type: actionTypes.DELETE_NOTE,
    id
});

export const getNotes = (list) => ({
    type: actionTypes.GET_NOTES,
    list
});



