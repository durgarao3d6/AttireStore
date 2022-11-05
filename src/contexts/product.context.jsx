import { createContext, useEffect, useState } from "react";
import SHOP_DATA from '../shopdata.js';
import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap : {}
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap,setCategoriesMap] = useState({});
    const [products, setProducts] = useState([])
    

    useEffect(() => {
        const getCategories = async () => {
           const categoryMap = await  getCategoriesAndDocuments();
           setCategoriesMap(categoryMap);
        }
        getCategories();
    }, [])

    const value = { categoriesMap }
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}