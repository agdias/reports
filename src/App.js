import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import './assets/styles/index.css'
import { authenticate } from './utils/api2'


import Roteadores from './components/Roteadores'

const  App = () => {

    
    const [ user, setUser ] = useState("Admin_Zabbix")
    const [ password, setPassword ] = useState("Z@bB1Xx")
    const [ token, setToken ] = useState(null)
    
   

    useEffect(() => {
        authenticate(user,password)
          .then((token) => { 
              setToken(token)
             
            })
          .catch((error) => console.error("Error"))
          
    },[])


  
  

   return (
     
        
         
     <div className="App">
      <Roteadores token={token}/>
     </div>
   )

}

export default App;