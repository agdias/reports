import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate, getServices , getSLA} from '../utils/api2'
import { addServices, addSLA } from '../actions'
import { CSVLink } from 'react-csv'
import { Button,
         Form,
         Modal,
         Table} from 'semantic-ui-react'

import { Link, useParams } from 'react-router-dom'
import  DatePicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import ptBR from 'date-fns/locale/pt-BR'

function Roteadores(props) {

const [ startDate, setStartDate ] = useState(null)
const [ endDate, setEndDate ] = useState(null)
const [ error, setError ] = useState(null)
const [ open, setOpen ] = useState(false)
const [ dimmer, setDimmer ] = useState(null)
const [ disabled, setDisabled ] = useState(true)
const [ header ] = useState([
    { label: "Roteador", key: "roteador" },
    { label: "serviceid", key: "serviceid"},
    { label: "SLA", key: "sla" },
    { label: "okTime", key: "roteador" },
    { label: "downtimeTime", key: "downtimeTime" },
    { label: "problemTime", key: "problemTime" },

])

const [ report, setReport ] =  useState(null)

//const token =  useSelector((state) => state.token )


const dispatch = useDispatch()

const services = useSelector(state => state.services)
const sla = useSelector(state => state.sla)

useEffect(() => {
  
  getServices(props.token)
    .then((response) => {
        response ? dispatch(addServices(response)) : setError("No Services available")
    })
}, [props.token])




  const printReport = () => {
      let output = []

     

      sla &&
      Object.keys(services).forEach((key) => {
        sla[services[key].serviceid]  &&
        output.push({
            roteador: services[key].name,
            serviceid: services[key].serviceid,
            sla: sla[services[key].serviceid].sla[0].sla,
            okTime: sla[services[key].serviceid].sla[0].okTime,
            downtimeTime: sla[services[key].serviceid].sla[0].downtimeTime,
            problemTime:  sla[services[key].serviceid].sla[0].problemTime
        })
        
      })
      
      setReport(output)
  }
  const onSubmitHandler = (event) => {
      let output = []
      let service = {}
      event.preventDefault()
      services && 
      Object.keys(services).forEach((service) => {
          getSLA(props.token, services[service].serviceid, startDate/1000, endDate/1000)
            .then((response) => dispatch(addSLA(response.result)))   
      })
      setDisabled(false)
    
      console.log(output)
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
                                   <Button  onClick={printReport} color='teal'>Gerar CSV</Button>
                                   {
                                       report &&
                                       <CSVLink data={report} headers={header}>
                                           Download
                                       </CSVLink>
                                   }
                                  {/*  <Modal
                                     onClose = {() => setOpen(false)}
                                     onOpen = {() => setOpen(true)}
                                     trigger={
                                         <Button color='teal' disabled={disabled}>Gerar CSV</Button>
                                     }
                                   >
                                       <Modal.Header>Exportar dados para formato csv</Modal.Header>
                                       <Modal.Content>
                                           <CSVLink data={printReport} headers={header}>
                                               Download me
                                           </CSVLink>
                                       </Modal.Content>

                                   </Modal> */}
                                   
                              </Form.Group>
                </Form>
            </div>
            {
                services &&
                <div className="result-table">
                    
                <Table celled selectable>
                              <Table.Header>
                                  <Table.Row>
                                      <Table.HeaderCell>Links</Table.HeaderCell>
                                      <Table.HeaderCell>Disponibilidade (%)</Table.HeaderCell>
                                      <Table.HeaderCell>Tempo Disponível (H)</Table.HeaderCell>
                                      <Table.HeaderCell>Downtime time (H)</Table.HeaderCell>
                                      <Table.HeaderCell>Tempo Indisponível (H)</Table.HeaderCell>
    
                                  </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            {
                             services &&
                             Object.keys(services).map((service) => {
                                const si = services[service].serviceid
                                 return (
                                    <Table.Row>
                                          <Table.Cell>
                                          {/*     <Link to={`/roteadores/${services[service].serviceid}`}> {services[service].name} */}
                                              <Link 
                                                to={{
                                                    pathname: `/roteadores/${services[service].serviceid}`,
                                                    token: props.token
                                                    
                                                    
                                                }}
                                              
                                               
                                              >
                                                   {services[service].name}
                                              
                                              </Link>
                                          
                                          </Table.Cell>
                                           
                                        {/* {sla[si] && }    <Table.Cell>{sla[si].sla[0].sla}</Table.Cell> */}
                                        {
                                            sla[services[service].serviceid] 
                                            ?
                                            <Table.Cell>{Number(sla[si].sla[0].sla).toFixed(2)}</Table.Cell>
                                            :
                                            <Table.Cell>Indisponivel</Table.Cell>
                                        }
                                        {
                                            sla[si] 
                                            ?
                                            <Table.Cell>{Number(sla[si].sla[0].okTime/3600).toFixed(4)}</Table.Cell>
                                            :
                                            <Table.Cell>Indisponivel</Table.Cell>
                                        }

{
                                            sla[si] 
                                            ?
                                            <Table.Cell>{Number(sla[si].sla[0].downtimeTime/3600).toFixed(4)}</Table.Cell>
                                            :
                                            <Table.Cell>Indisponivel</Table.Cell>
                                        }
                                        
                                       
                                        {
                                            sla[si] 
                                            ?
                                            
                                            <Table.Cell>{Number(sla[si].sla[0].problemTime/3600).toFixed(4)}</Table.Cell>
                                          
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

            }
          
           
     
        </React.Fragment>
    )
}

export default Roteadores