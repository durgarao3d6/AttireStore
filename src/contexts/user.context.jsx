import { createContext ,useEffect,useState} from "react";
import { AuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase.utils";

export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=> null
});

export const UserProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    useEffect(()=>{
        const unSubscribe = AuthStateChangedListener((user)=>{
            if(user)
                createUserDocumentFromAuth(user);
            setCurrentUser(user);
        });

        return unSubscribe;
    },[])

    const value={currentUser,setCurrentUser};
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}