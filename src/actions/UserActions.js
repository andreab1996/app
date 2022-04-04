import axios from "axios";
import {
    CREATE_USER,
    DELETE_USER,
    EMAIL_CHANGED,
    FETCH_PERMISSIONS,
    FETCH_USER,
    FETCH_USERS,
    FIRST_NAME_CHANGED,
    LAST_NAME_CHANGED,
    PERMISSION_STATUS_CHANGED,
    STATUS_CHANGED,
    UPDATE_USER,
} from "./types";

async function getUsersData() {
    let lists = [];
    await axios({
        mode: "no-cors",
        method: "get",
        headers: { "Content-Type": "application/json" },
        url: "/api/user?page=1&per_page=10",
    })
        .then((response) => {
            lists = response.data;
        })
        .catch((e) => {
            console.error(e);
        });

    return lists;
}

async function getUserData(userId) {
    let user = null;
    await axios({
        mode: "no-cors",
        method: "get",
        headers: { "Content-Type": "application/json" },
        url: `/api/user/${userId}`,
    })
        .then((response) => {
            user = response.data;
        })
        .catch((e) => {
            console.error(e);
        });

    return user;
}

export const getUsers = () => {
    return async (dispatch) => {
        let lists = await getUsersData();
        dispatch({
            type: FETCH_USERS,
            payload: lists,
        });
    };
};

export const getUser = (url) => {
    let tmp = url.split("/").length;
    let userId = url.split("/")[tmp - 1];
    return async (dispatch) => {
        let user = await getUserData(userId);
        dispatch({
            type: FETCH_USER,
            payload: user,
        });
    };
};

export const saveUser = (user) => {
    return (dispatch) => {
        axios({
            mode: "no-cors",
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            url: "/api/user",
            data: user,
        })
            .then((response) => {
                console.log("response = ", response);
                dispatch({
                    type: CREATE_USER,
                    payload: { data: response.data, redirectTo: "/" },
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
};

export const updateUser = (user) => {
    return (dispatch) => {
        axios({
            mode: "no-cors",
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            url: `/api/user/${user.id}`,
            data: user,
        })
            .then((response) => {
                console.log("response = ", response);
                dispatch({
                    type: UPDATE_USER,
                    payload: { data: response.data },
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
};

export const deleteUser = (userId) => {
    return (dispatch) => {
        axios({
            mode: "no-cors",
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            url: `/api/user/${userId}`,
        })
            .then(async (response) => {
                let users = await getUsersData();
                dispatch({
                    type: DELETE_USER,
                    payload: users,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
};

export const getPermissions = () => {
    return (dispatch) => {
        axios({
            mode: "no-cors",
            method: "get",
            headers: { "Content-Type": "application/json" },
            url: "/api/permission",
        })
            .then((response) => {
                console.log(response.data);
                dispatch({
                    type: FETCH_PERMISSIONS,
                    payload: response.data,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
};

export const savePermissions = (userId, permissions) => {
    return (dispatch) => {
        permissions.map((p) => {
            axios({
                mode: "no-cors",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                url: "/api/userpermission",
                data: { userId, permissionId: p.id },
            })
                .then((response) => {
                    console.log("response = ", response);
                    // dispatch({
                    //     type: CREATE_USER,
                    //     payload: { data: response.data, redirectTo: "/" },
                    // });
                })
                .catch((e) => {
                    console.error(e);
                });
        });
    };
};

export const deletePermissions = (userId, permissions) => {
    return (dispatch) => {
        permissions.map((p) => {
            axios({
                mode: "no-cors",
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
                url: "/api/userpermission",
                data: { userId, permissionId: p.id },
            })
                .then((response) => {
                    console.log("response = ", response);
                })
                .catch((e) => {
                    console.error(e);
                });
        });
    };
};

export const userFirstNameChanged = (firstName) => {
    return {
        type: FIRST_NAME_CHANGED,
        payload: firstName,
    };
};

export const userLastNameChanged = (lastName) => {
    return {
        type: LAST_NAME_CHANGED,
        payload: lastName,
    };
};

export const userEmailChanged = (status) => {
    return {
        type: EMAIL_CHANGED,
        payload: status,
    };
};

export const statusChanged = (email) => {
    return {
        type: STATUS_CHANGED,
        payload: email,
    };
};

export const permissionStatusChanged = (permission) => {
    return {
        type: PERMISSION_STATUS_CHANGED,
        payload: permission,
    };
};
