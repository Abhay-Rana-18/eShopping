import { combineReducers } from "redux";
import adminPage from "./adminPage";

const reducers = combineReducers({
    admin: adminPage,
})

export default reducers;