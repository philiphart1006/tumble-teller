// React imports
import { Form,  useActionData, useLoaderData } from 'react-router-dom'
import { useState } from 'react'


// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

// ! Default function
export default function Comboforecast(){

  // State
  const [ postcode, setPostcode] = useState('')

  // Set variables with fetched data
  const weatherObj = useActionData(postcode)
  console.log('Weather array: ',{weatherObj})
  const weatherArr = weatherObj?.list

  // Retrieve carbon intensity data
  const forecasts = useLoaderData()
  const forecastsArr = forecasts?.data

  // Only return every other index for hourly rather than half hourly data
  const forecastsHour = forecastsArr.filter(function(element, index, array){
    return (index % 2 === 0);
  })
  const forecastsThreeHour = forecastsHour.filter(function(forecast){
    const endTime = new Date(forecast.to)
    const endHour = endTime.getHours()
    return (endHour % 3 === 0);
  })

  // If current hour is divisible by 3, remove first result from forecastThreeHour array
  const now = new Date()
  console.log(now)
  const currentHour = now.getHours()
  console.log(currentHour)
  if (currentHour % 3 === 0){
    forecastsThreeHour.shift()
  }
  
  let weatherFinal = []
  //* Remove nighthours
  // Remove from carbon intensity
  const forecastsFinal = forecastsThreeHour.filter(function(forecast){
    const forecastDate = new Date (forecast.to)
    const forecastHour = forecastDate.getHours()
    return (forecastHour > 8 && forecastHour < 19)
  })
  // Remove from weather
  weatherFinal = weatherArr?.filter(function(weather){
    const weatherDate = new Date (weather.dt * 1000)
    const weatherHour = weatherDate.getHours()
    return (weatherHour > 8 && weatherHour < 19)
  })

  // Set weather array to same length as carbon intensity array
  weatherArr && (weatherFinal.length = forecastsFinal?.length)

  // ! JSX
  return (
    <>
      <h1 className = 'display-3'>When can you use your tumble dryer?</h1>
      <Form className='form' method="POST">
        <label hidden htmlFor="postcode">Postcode start</label>
        <input type="text" name='postcode' placeholder="(e.g. SW1A)" />
        <button type="submit">Submit</button>
      </Form>
      { weatherArr
        ?
        <>
        <section className='results'>
        <Container fluid>
            <Col>
            { forecastsFinal.map((forecast) => {
              const { shortname, regionid, intensity, to } = forecast
              const datetime = new Date(to)
              const date = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`
              const time = `${datetime.getHours()}:${datetime.getMinutes()}${datetime.getMinutes()}`
              return (
                <Row
                key={to}
                className='region-container stretch-container'
                >
                  <p>{date} {time}</p>
                  <p>-</p>
                  <p>{intensity.forecast} gCO<sub>2</sub>/kWh</p>
                  <p className={`
                      ${intensity.index.includes('low') ? 'low' : ''} 
                      ${intensity.index.includes('moderate') ? 'moderate' : ''} 
                      ${intensity.index.includes('high') ? 'high' : ''} 
                      `}>{intensity.index}</p>
                  <p>-</p>
                </Row>
              )
              })}
            </Col>
          </Container>
          <Container fluid>
            <Col>
            {/* This is where weather forecast array should be mapped out into rows */}
            { weatherFinal.map((weather, idx) => {
              const main = weather?.weather[0].main
              const windspeed = weather?.wind.speed
              const temp = weather?.main.temp - 273.1
              const humidity = weather?.main.humidity
              const dt = weather?.dt
              const dateTime = new Date(dt*1000).toISOString()
              const datetime = new Date(dateTime)
              
              console.log(typeof(datetime))
              const date = `${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}`
              const time = `${datetime.getHours()}:${datetime.getMinutes()}${datetime.getMinutes()}`
              return(
                <Row className='region-container'
                  key={idx}
                  >
                    <p>{date} {time}</p>
                    <p
                  className={`
                  ${(main.includes('rain')||main.includes('storm')||main.includes('snow')) ? 'high' : ''}
                  ${main.includes('sunny') ? 'low' : ''}
                  `}
                  >{main}</p>
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
                  <p
                  className={`
                  ${humidity > 90 ? 'high' : ''}
                  `}
                  >Humidity: {humidity.toFixed(0)} %</p>
                </Row>
              )
            })}
                  {/* <Row className='region-container'>
                  <h5>Local weather</h5>&nbsp;
                    <p
                    className={`
                    ${(main.includes('rain')||main.includes('storm')||main.includes('snow')) ? 'high' : ''}
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
                    <p
                    className={`
                    ${humidity > 90 ? 'high' : ''}
                    `}
                    >Humidity: {humidity.toFixed(0)} %</p>
                  </Row> */}
            </Col>
        </Container>
        </section>
        {/* <Container>
          <Row>
            <Col className='display-6'>
            Recommendation: {recommendation}
            </Col>
          </Row>
        </Container> */}
        </>
        :
        <p className='display2 font-italic'><i>Please input the first half of your postcode</i></p>
      }
    </>
  )
}