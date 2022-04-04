import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import PermissionReducer from "./PermissionReducer";

// const rootReducer = (state = initState, action) => {
//     return state;
// };
const rootReducer = combineReducers({
    user: UserReducer,
    permission: PermissionReducer,
});
export default rootReducer;
