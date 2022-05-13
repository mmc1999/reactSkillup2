import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducer/rootReducer";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore(
    {reducer: rootReducer},
    composeWithDevTools(applyMiddleware(thunk))
);
