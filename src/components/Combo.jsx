// React imports
import { Form,  useActionData } from 'react-router-dom'
import { useState } from 'react'


// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

// ! Default function
export default function Combo(){

  // State
  const [ postcode, setPostcode] = useState('')

  // Set variables with fetched data
  const resultsObj = useActionData(postcode)
  console.log('Results obj: ',resultsObj)
  const region = resultsObj?.carbonResults
  console.log('Region data: ', region)
  const regionName = region?.data[0].shortname
  const regionData = region?.data[0].data[0].intensity

  const weather = resultsObj?.weatherResults
  const main = weather?.weather[0].main
  const windspeed = weather?.wind.speed
  const temp = weather?.main.temp - 273.1

  return (
    <>
      <h1>Welcome to the carbon intensity by region page</h1>
      <Form className='form' method="POST">
        <label hidden htmlFor="postcode">Postcode start</label>
        <input type="text" name='postcode' placeholder="Postcode start (e.g. SW1A)" />
        <button type="submit">Submit</button>
      </Form>
      { region
        ?
        <Container fluid>
          <Row>
                <Col>
                  <p>{regionName}</p>
                  <p>{regionData.forecast}</p>
                  <p>{regionData.index}</p>
                </Col>
                <Col>
                  <p>{main}</p>
                  <p>{windspeed}</p>
                  <p>{temp}</p>
                </Col>
          </Row>
        </Container>
        :
        <p>Please input the first half of your postcode</p>
      }
      
    </>
  )
}