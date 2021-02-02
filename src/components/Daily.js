import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Daily(props) {
    const serviceid = useParams()
    const services = useSelector((state) => state.services)
    console.log(services)
  
    return (
        <h1>{JSON.stringify(serviceid,null,2)}</h1>
    )
}

export default Daily