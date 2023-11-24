// ! Imports
// React imports
import { useLoaderData} from 'react-router-dom'

// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

// ! Default function
export default function Forecast(){

  // Set variables & retrieve data
  const forecasts = useLoaderData()
  const forecastsArr = forecasts?.data
  // Only return every other index for hourly rather than half hourly data
  const forecastsHour = forecastsArr.filter(function(element, index, array){
    return (index % 2 === 0);
  })

  // ! JSX
  return (
    <>
      <h1 className='bold display-6'>Nationwide carbon intensity by hour over next 48 hours</h1>
      <Container fluid>
        <Row>
          { forecastsHour.map((forecast) => {
            const { shortname, regionid, intensity, to } = forecast
            const datetime = new Date(to)
            const date = `${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}`
            const time = `${datetime.getHours()}:${datetime.getMinutes()}${datetime.getMinutes()}`
            return (
              <Col
              key={to}
              xs={5}
              md={4}
              lg={3}
              xl={2}
              className='region-container'
              >
                <p>{date}</p>
                <p>{time}</p>
                <p>{intensity.forecast} gCO<sub>2</sub>/kWh</p>
                <p className={`
                    ${intensity.index.includes('low') ? 'low' : ''} 
                    ${intensity.index.includes('moderate') ? 'moderate' : ''} 
                    ${intensity.index.includes('high') ? 'high' : ''} 
                    `}>{intensity.index}</p>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
}