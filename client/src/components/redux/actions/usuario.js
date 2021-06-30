import actionTypes from "../actionTypes";

export const saveUser = (username) => ({
    type: actionTypes.LOGIN,
    username
});