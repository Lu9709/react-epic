import {createContext,useContext} from "react";
import AuthStore from "./auth";
import UserStore from "./user";
import ImageStore from "./image";

const context = createContext({
    AuthStore,
    UserStore,
    ImageStore
})

window.store = {
    AuthStore,
    UserStore,
    ImageStore
}
export const useStores = () => useContext(context)
