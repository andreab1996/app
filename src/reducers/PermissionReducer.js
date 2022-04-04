import { CODE_CHANGED, CREATE_PERMISSION, DELETE_PERMISSION, DESC_CHANGED } from "../actions/types";

const INITIAL_STATE = {
    permission: {
        code: "",
        description: "",
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_PERMISSION:
            return { ...state, permission: { code: "", description: "" } };
        case DELETE_PERMISSION:
            return { ...state };
        case CODE_CHANGED:
            return { ...state, permission: { ...state.permission, code: action.payload } };
        case DESC_CHANGED:
            return { ...state, permission: { ...state.permission, description: action.payload } };
        default:
            return INITIAL_STATE;
    }
};
