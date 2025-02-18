import React,{useState} from 'react'
import cookies from 'js-cookies';


export const UserContext = React.createContext();

export function Context({children}) {


    const [user,setUser] = useState(cookies.getItem('user'));

    function logout()
    {
        setUser(false);
        cookies.removeItem('user')
    }
    function login(name)
    {
        setUser(true);
        cookies.setItem('user',name)
    }
  
    return (
      <UserContext.Provider value={{user,login,logout}} >
        {children}
      </UserContext.Provider>
    );

}