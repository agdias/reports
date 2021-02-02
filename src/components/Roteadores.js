import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getServices , getSLA} from '../utils/api2'
import { addServices, addSLA } from '../actions'

import { Button,
         Form,
         Table} from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import  DatePicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import ptBR from 'date-fns/locale/pt-BR'






function Roteadores(props) {

const [ startDate, setStartDate ] = useState(null)
const [ endDate, setEndDate ] = useState(null)
const [ serviceIds, setServiceIds ] = useState(null)
const [ result, setResult ] = useState(null)
const [ error, setError ] = useState(null)

const services = useSelector((state) => state.services)
const sla = useSelector ((state) => state.sla)
const dispatch = useDispatch()

useEffect(() => {
    getServices(props.token)
      .then((services) => dispatch(addServices(services)))
      .catch(() => console.error("no services"))
 
   
},[])

  const onSubmitHandler = (event) => {
      event.preventDefault()
      services && 
      Object.keys(services).forEach((service) => {
          getSLA(props.token, services[service].serviceid, startDate/1000, endDate/1000)
            .then((response) => dispatch(addSLA(response.result)))
      })
  }

  const onStartDateChangeHandler = (date)  => {
        
    const now = Date.parse(date)
    setStartDate(now)

}

const onEndDateChangeHandler = (date) =>  {
    
    const now = Date.parse(date)
   
    setEndDate(now)
}

const isDateRange = () => {

    return endDate == null
}


    {error && <h1>{error}Error</h1>}
    

    return (
        <React.Fragment>
          



            <div className="date-select">
              
                <Form style={{marginTop:65,marginLeft: 20}}   onSubmit={onSubmitHandler}> 
                              <Form.Group inline>
                                <Form.Field
                                  control={DatePicker}
                                  showTimeSelect
                                  timeFormat="HH:mm:ss"
                                  timeIntervals={1}
                                  timeCaption="Hora"
                                  dateFormat="MMMM d, yyyy h:mm:ss aa"
                                  locale={ptBR}
                                  label="Data Inicio"
                                
                                  selected={startDate}
                                  onChange={(date) => onStartDateChangeHandler(date)}
                                />
                                <Form.Field
                                  control={DatePicker}
                                  showTimeSelect
                                  timeFormat="HH:mm:ss"
                                  timeIntervals={1}
                                  timeCaption="Hora"
                                  dateFormat="MMMM d, yyyy h:mm:ss aa"
                                  locale={ptBR}
                                  label="Data Fim"
                                  
                                  selected={endDate}
                                  onChange={(date) => onEndDateChangeHandler(date)}
                                />
                                   <Button disabled={isDateRange()} color="instagram" type="submit">Consultar</Button>   
                              </Form.Group>
                </Form>
            </div>
            <div className="result-table">
                <Table celled selectable>
                              <Table.Header>
                                  <Table.Row>
                                      <Table.HeaderCell>Link</Table.HeaderCell>
                                      <Table.HeaderCell>Disponibilidade</Table.HeaderCell>
                                      <Table.HeaderCell>Ok Time</Table.HeaderCell>
                                      <Table.HeaderCell>Downtime</Table.HeaderCell>
                                      <Table.HeaderCell>Problem time</Table.HeaderCell>
    
                                  </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            {
                             services &&
                             Object.keys(services).map((service) => {
                                const si = services[service].serviceid
                                 return (
                                    <Table.Row>
                                          <Table.Cell><Link to={`/roteadores/${services[service].serviceid}`}> {services[service].name}</Link></Table.Cell>
                                           
                                        {/* {sla[si] && }    <Table.Cell>{sla[si].sla[0].sla}</Table.Cell> */}
                                        {
                                            sla[services[service].serviceid] 
                                            ?
                                            <Table.Cell>{Number(sla[si].sla[0].sla).toFixed(4)}</Table.Cell>
                                            :
                                            <Table.Cell>Indisponivel</Table.Cell>
                                        }
                                        {
                                            sla[si] 
                                            ?
                                            <Table.Cell>{Math.round((sla[si].sla[0].okTime/3600)/10)*10}</Table.Cell>
                                            :
                                            <Table.Cell>Indisponivel</Table.Cell>
                                        }
                                        
                                        {
                                            sla[si] 
                                            ?
                                            <Table.Cell>{Math.round((sla[si].sla[0].downtimeTime/3600)/10)*10}</Table.Cell>
                                            :
                                            <Table.Cell>Indisponivel</Table.Cell>
                                        }
                                        {
                                            sla[si] 
                                            ?
                                            
                                            <Table.Cell>{Math.round((sla[si].sla[0].problemTime/3600)/10)*10}</Table.Cell>
                                          
                                            :
                                            <Table.Cell>Indisponivel</Table.Cell>
                                        }
                                    </Table.Row>
                                 )
                             })
                         }
                        </Table.Body>
                        </Table>

            </div>
           
     
        </React.Fragment>
    )
}

export default Roteadores