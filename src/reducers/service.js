export  function servicesReducer(state={}, action) {

    const { services } = action;
    let index = 0
    let result = {}
    let target
    
   
    console.info(action.services)
    switch (action.type) {
      
        case 'ADD_SERVICES': 
          Object.keys(services).forEach((key) => {
              
              target  = {
                [services[key].serviceid]: services[key]
              } 

              result = Object.assign(result, target)
              
          })
          console.log(result)
        
          return {
                  ...state , 
                 ...result
              }

             /*  result = {
                  [action.services[key].serviceid]: action.services[key]
              } */
              
            

        default:
            return state
    }
}

export function slaReducer(state=[], action) {
    const { type, sla } = action
    switch ( type ) {
        case 'ADD_SLA':
            return {
                ...state,
                ...sla
            }
        default:
            return state;
    }
}

/****
 * [serviceid]: {
 *   ...services
 * }
 * 
 * 
 */