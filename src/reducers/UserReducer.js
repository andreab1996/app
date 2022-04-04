import {
    CONFIRM_TO_DELETE_USER,
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
} from "../actions/types";

const INITIAL_STATE = {
    users: [],
    user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userName: "",
        status: true,
        permissions: [],
    },
    redirectTo: "",
    permissions: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload,
                redirectTo: "",
                user: { ...state.user, firstName: "", lastName: "", email: "" },
            };
        case FETCH_USER:
            let currentUser = action.payload;
            let userPermissions = state.permissions.map((p) => {
                let permission = currentUser.permissions?.find((per) => per.permissionId == p.id);
                if (permission != null) return { ...p, status: true };
                else return { ...p, status: false };
            });

            return {
                ...state,
                user: action.payload,
                permissions: userPermissions,
                redirectTo: "",
            };
        case CREATE_USER:
            return { ...state, user: action.payload };
        case UPDATE_USER:
            return { ...state, redirectTo: action.payload.redirectTo };
        case DELETE_USER:
            return { ...state, users: action.payload };
        case FETCH_PERMISSIONS:
            return { ...state, permissions: action.payload };
        case FIRST_NAME_CHANGED:
            return { ...state, user: { ...state.user, firstName: action.payload } };
        case LAST_NAME_CHANGED:
            return { ...state, user: { ...state.user, lastName: action.payload } };
        case EMAIL_CHANGED:
            return { ...state, user: { ...state.user, email: action.payload } };
        case STATUS_CHANGED:
            return { ...state, user: { ...state.user, status: action.payload } };
        case PERMISSION_STATUS_CHANGED:
            return {
                ...state,
                permissions: state.permissions.map((p) => {
                    if (p.id == action.payload.id)
                        return {
                            ...action.payload,
                            status: !action.payload.status,
                        };
                    else return p;
                }),
            };
        default:
            return INITIAL_STATE;
    }
};
