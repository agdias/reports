import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Link } from 'react-router-dom'

          
import './assets/styles/index.css'
import { authenticate } from './utils/api2'
import Roteadores from './components/Roteadores'

const  App = () => {
    const [ user, setUser ] = useState("Admin_Zabbix")
    const [ password, setPassword ] = useState("Z@bB1Xx")
    const [ token, setToken ] = useState(null)
    const [ error, setError ] = useState(null)
    useEffect(() => {
        authenticate(user,password)
          .then((token) => { 
              setToken(token)
             
            })
         
          .catch(() => setError("Falha de autenticação!"))
          
    },[])
   return (     
     <div className="App">
      <Roteadores token={token}/>
     </div>
   )
}
export default App;

  //const user = "Admin_Zabbix"
    //const password = "Z@bB1Xx" 