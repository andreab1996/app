import axios from "axios";
import { CODE_CHANGED, CREATE_PERMISSION, DELETE_PERMISSION, DESC_CHANGED } from "./types";
import { getPermissions } from "./UserActions";

export const savePermission = (permission) => {
    return (dispatch) => {
        axios({
            mode: "no-cors",
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            url: "/api/permission",
            data: permission,
        })
            .then((response) => {
                console.log("response = ", response);
                dispatch({
                    type: CREATE_PERMISSION,
                    payload: {},
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
};

export const deletePermission = (permissionId) => {
    return (dispatch) => {
        axios({
            mode: "no-cors",
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            url: `/api/permission/${permissionId}`,
        })
            .then((response) => {
                console.log("response = ", response);
                getPermissions();
                dispatch({
                    type: DELETE_PERMISSION,
                    payload: null,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
};

export const codeChanged = (code) => {
    return {
        type: CODE_CHANGED,
        payload: code,
    };
};

export const descriptionChanged = (description) => {
    return {
        type: DESC_CHANGED,
        payload: description,
    };
};
