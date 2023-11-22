// React imports
import { useLoaderData, Form } from 'react-router-dom'
import { useState, useEffect } from 'react'


// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'


// ! Default function
export default function National(){

  // State
  const [ postcode, setPostcode] = useState('PO19')

  // const region = useLoaderData()
  // const regionName = region?.data[0].shortname
  // const regionData = region?.data[0].data[0].intensity
  // console.log(regionData)

    const region = useLoaderData('PO19')
    const regionName = region?.data[0].shortname
    const regionData = region?.data[0].data[0].intensity

    function handleSubmit(e){
      e.preventDefault()
      console.log(e.target.postcode.value)
      setPostcode(e.target.postcode.value)
    }

  return (
    <>
      <h1>Welcome to the carbon intensity by region page</h1>
      <Form className='form' onSubmit={handleSubmit}>
      {/* <Form className='form'> */}
        <label hidden htmlFor="postcode">Postcode start</label>
        <input type="text" name='postcode' placeholder="Postcode start (e.g. SW1A)" />
        <button type="submit">Submit</button>
      </Form>
      { postcode
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