import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getHostGroups } from '../utils/api2'
import  DatePicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button,
    Form,
    Table} from 'semantic-ui-react'
import ptBR from 'date-fns/locale/pt-BR'


function Daily(props) {
    
   
    const services = useSelector((state) => state.services)
    const location = useLocation()
    const match = useRouteMatch()
    const [token, setToken] = useState(location.token)
    const [ hostGroups, setHostGroups ] = useState(null)
    const [ startDate, setStartDate ] = useState(new Date())
    const serviceId = match.params.serviceid 
    

   
    
    useEffect(() => {
        getHostGroups(token)
        .then((res) => setHostGroups(res))
    }, [token])

    const daysUntilNow = () => {
       const date = new Date()
       const day = date.getDate()
      
       return day
    
    }

    const convert = (days) => {
        const timeinsecs = Date.now()/1000
        return (timeinsecs - days*86400)*1000
    }

    const dateRange = (year,month,day) => {
        const date = new Date()
        const fullMonth = month < 10 ? `0${month}` : month
        const fullDay = day < 10 ? `0${day}` : day
        
        const end = new Date(`${year}-${fullMonth}-${fullDay}T23:59:59`).getTime()
        //const start = new Date(`${year}-${fullMonth}-${fullDay}T00:00:00`).getTime()
        const start = new Date(`${year}-${fullMonth}-01T00:00:00`).getTime()
       
        return {
            start: start,
            end: end
        }

    }

    

/*     const  hourInSecs = (hour) => {
        return hour * 3600
    }
 */
   /*  const calcRange = ( day,hour ) =>  {
        const timeInSecs = Date.now()/1000
        const date = new Date()
        
        const hours = date.getHours() < 10  ?`0${date.getHours()}` : date.getHours()
        const startSecs = 
        

      
    } */

    /**
     *  enddate = day at 23:59:59
     * start date = now - day of enddate at 00:00
     * 
     */

    
    
      console.log(services[serviceId])
   
  
    return (
        <React.Fragment>
          <div className="daily-header">
             <div className="header-title">
           {
             services &&
             <h2>Relatório de  Disponibilidade {services[serviceId].name} </h2>
           }
               
              
               
             </div> 
             <div className="month-picker"> 
            
                <Form>
                     <Form.Field
                       control={DatePicker}
                       selected={startDate}
                       onChange={date => setStartDate(date)}
                       dateFormat="MM/yyyy"
                       showMonthYearPicker
                       locale={ptBR}
                     />
                 </Form>       
            </div>  
          </div>
          <div className="result-table">
              <Table celled selectable>
                  <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>Dia</Table.HeaderCell>
                          <Table.HeaderCell>Tipo</Table.HeaderCell>
                          <Table.HeaderCell>Nome do Equipamento</Table.HeaderCell>
                          <Table.HeaderCell>Designação do Circuito</Table.HeaderCell>
                          <Table.HeaderCell>Meta</Table.HeaderCell>
                          <Table.HeaderCell>Disponibilidade</Table.HeaderCell>
                          <Table.HeaderCell>Tempo indisponível (horas)</Table.HeaderCell>
                          <Table.HeaderCell>Tempo disponível (horas)</Table.HeaderCell>

                      </Table.Row>
                  </Table.Header>
              </Table>
        
            {/*  Bom, vamos lá. Cada linha vai corresponder a um dia do mes. Com o dia corrente em mãos, faço um loop de 1 até o dia corrente.
             Por exemplo, hoje, dia 05 de fevereiro de 2021. for i in 1..today
             Para cada dia, calculo o SLA daquele item
             <hr/> */}
          </div>

         
        
         
        
        
        </React.Fragment>
      
    )
}

export default Daily

/* [day]: {
    hostGroup,
    name,
    des-circuito
    meta
    sla

}

   case ADD_RECIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      }



 */