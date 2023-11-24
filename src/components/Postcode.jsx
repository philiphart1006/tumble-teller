// ! Imports
// React imports
import { Form,  useActionData } from 'react-router-dom'
import { useState } from 'react'


// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

// ! Default function
export default function Postcode(){

  // State
  const [ postcode, setPostcode] = useState('')

  // Set variables with fetched data
  const region = useActionData(postcode)
  const regionName = region?.data[0].shortname
  const regionData = region?.data[0].data[0].intensity

  return (
    <>
      <h1>Carbon intensity for your region today</h1>
      <Form className='form' method="POST">
        <label hidden htmlFor="postcode">Postcode start</label>
        <input type="text" name='postcode' placeholder="Postcode start (e.g. SW1A)" />
        <button type="submit">⏎</button>
      </Form>
      { region
        ?
        <Container fluid className='individual-container'>
          <Row>
                <Col className='region-container'>
                  <p>{regionName}</p>
                  <p>{regionData.forecast} gCO<sub>2</sub>/kWh</p>
                  <p className={`
                    ${regionData.index.includes('low') ? 'low' : ''} 
                    ${regionData.index.includes('moderate') ? 'moderate' : ''} 
                    ${regionData.index.includes('high') ? 'high' : ''} 
                    `}>{regionData.index}</p>
                </Col>
          </Row>
        </Container>
        :
        <p>Please input the first half of your postcode</p>
      }
      
    </>
  )
}