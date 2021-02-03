import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Link,
  useParams } from 'react-router-dom'
  import { useDispatch, useSelector } from 'react-redux'

          
import './assets/styles/index.css'
import { authenticate } from './utils/api2'
import Roteadores from './components/Roteadores'
import Daily from './components/Daily'
import { addToken, addServices } from './actions'
import { getServices } from './utils/api2'




const  App = () => {
    
    const [ error, setError ] = useState(null)
   
    const token = useSelector((state) => state.token)
    const user = "Admin_Zabbix"
    const password = "Z@bB1Xx"
    const [tkn, setTkn ] = useState(null)

    useEffect(() => {
      authenticate(user,password)
        .then((res) => setTkn(res))
    }, [])

/*     useEffect(() => {
      token &&
      getServices(token).then((res) => dispatch((addServices(res))))

    }, []) */
    
   return (    
       <React.Fragment>
        
          <div>
         
          <Route exact path="/" >
            {
              
              <Roteadores token={tkn} />
            }
             
           </Route>
           <Route path="/roteadores/:serviceid">
             <Daily />
           </Route>
          </div>         
          
         
       </React.Fragment>
         
     
     
   
   
   )
}
export default App;

  //const user = "Admin_Zabbix"
    //const password = "Z@bB1Xx" 