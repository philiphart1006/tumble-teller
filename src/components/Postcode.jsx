// React imports
import { Form,  useActionData } from 'react-router-dom'
import { useState } from 'react'


// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

// ! Default function
export default function National(){

  // State
  const [ postcode, setPostcode] = useState('')

  // Set variables with fetched data
  const region = useActionData(postcode)
  const regionName = region?.data[0].shortname
  const regionData = region?.data[0].data[0].intensity

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
          </Row>
        </Container>
        :
        <p>Please input the first half of your postcode</p>
      }
      
    </>
  )
}