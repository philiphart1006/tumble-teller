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

  let recommendation

  if(main?.includes('rain')){
      recommendation = "It's too wet out - best use the tumble dryer"}
      else if(temp < 5){
        recommendation = "It's bloomin' cold - best use the tumble dryer"
      } else if(windspeed < 1){
        recommendation = "There's not even a light zephyr - best use the tumble dryer"
      } else if(regionData?.index.includes('high')){
        recommendation = "Your local power grid is generating too much CO2 - ideally, hang your clothes outside to dry"
      } else if(regionData?.index.includes('low')){
        recommendation = "Your local grid is running green - tumble away!"
      } else if(regionData?.index.includes('moderate') && temp > 10){
        recommendation = "Your local grid isn't too polluting currently but it's nice and warm out - ideally, hang your clothes outside to dry"
      }
      else {recommendation = "Your local grid isn't too polluting currently and it's a tad chilly out - perhaps you can tumble today!"}


  return (
    <>
      <h1 className = 'display-3'>Should you use your tumble dryer today?</h1>
      <Form className='form' method="POST">
        <label hidden htmlFor="postcode">Postcode start</label>
        <input type="text" name='postcode' placeholder="(e.g. SW1A)" />
        <button type="submit" variant="primary">Submit</button>
      </Form>
      { region
        ?
        <>
        <Container fluid>
          <Row>
                <Col className='region-container'>
                  <h5>Current carbon intensity</h5>&nbsp;
                  <p>{regionName}</p>
                  <p>{regionData.forecast}</p>
                  <p className={`
                    ${regionData.index.includes('low') ? 'low' : ''} 
                    ${regionData.index.includes('moderate') ? 'moderate' : ''} 
                    ${regionData.index.includes('high') ? 'high' : ''} 
                    `}>{regionData.index}</p>
                </Col>
                <Col className='region-container'>
                <h5>Local weather</h5>&nbsp;
                  <p
                  className={`
                  ${main.includes('rain') ? 'high' : ''}
                  ${main.includes('sunny') ? 'low' : ''}
                  `}
                  >Conditions: {main}</p>
                  <p
                  className={`
                  ${windspeed < 1 ? 'high' : ''}
                  `}
                  >Wind: {windspeed} m/s</p>
                  <p
                  className={`
                  ${temp < 10 ? 'high' : ''}
                  ${temp > 20 ? 'low' : ''}
                  `}
                  >Temp: {temp.toFixed(1)} &deg;C</p>
                </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className='display-6'>
            Recommendation: {recommendation}
            </Col>
          </Row>
        </Container>
        </>
        :
        <p className='display2 font-italic'><i>Please input the first half of your postcode</i></p>
      }
    </>
  )
}