import actionTypes from "../actionTypes";

export const addNote = (note) => ({
    type: actionTypes.ADD_NOTE,
    note
});

export const editNote = (note,index) => ({
    type: actionTypes.EDIT_NOTE,
    note,
    index
});

export const deleteNote = (index) => ({
    type: actionTypes.DELETE_NOTE,
    index
});

export const getNotes = (list) => ({
    type: actionTypes.GET_NOTES,
    list
});

export const sortNotes = (asc) => ({
    type: actionTypes.SORT_NOTES,
    asc
});



