import { combineReducers } from 'redux'

import {  servicesReducer } from './service' 
import { slaReducer }  from './service'
import { tokenReducer } from './token';




const rootReducer = combineReducers({
    
    services: servicesReducer,
    sla: slaReducer, 
    token: tokenReducer,

  
   
})

export default rootReducer;

