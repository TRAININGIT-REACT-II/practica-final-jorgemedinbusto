const actions = [
    "LOGIN",
    "LOGOUT",
    "EDIT_NOTE",
    "ADD_NOTE",
    "DELETE_NOTE",
    "GET_NOTES"
];

const actionTypes = {};
actions.forEach(action => {
    actionTypes[action] = action;
});

export default actionTypes;