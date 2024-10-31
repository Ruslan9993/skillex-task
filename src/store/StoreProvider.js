import { createContext, useContext } from "react";
import ProductStore from "./ProductStore";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
    const store = {
        productStore: new ProductStore(),
    };

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
