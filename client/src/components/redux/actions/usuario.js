import actionTypes from "../actionTypes";

export const saveUser = (username) => ({
    type: actionTypes.LOGIN,
    username
});

export const logout = () => ({
    type: actionTypes.LOGOUT
});