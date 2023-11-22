// React imports
import { useLoaderData} from 'react-router-dom'

// Bootstrap imports
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

export default function National(){

  const region = useLoaderData()
  const regionsArr = region.data[0].regions
  console.log(regionsArr)

  return (
    <>
      <h1>Welcome to the carbon intensity by region page</h1>
      <Container fluid>
        <Row>
          { regionsArr.map((region) => {
            const { shortname, regionid, intensity } = region
            return (
              <Col
              key={regionid}>
                <p>{shortname}</p>
                <p>{intensity.forecast}</p>
                <p>{intensity.index}</p>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
}