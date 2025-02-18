import React,{useState} from 'react'
import cookies from 'js-cookies';


export const UserContext_1 = React.createContext();

export function Context_1({children}) {


    const [emplist,setemp_list] = useState([]);


    
    return (
      <UserContext_1.Provider value={{emplist,setemp_list}} >
        {children}
      </UserContext_1.Provider>
    );

}