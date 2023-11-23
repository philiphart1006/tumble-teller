// Images
import logoRect from '../assets/ttlogorect.png'

// Packages
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <>
    <Link to="/"><img src={logoRect} alt="tt logo" /></Link>
    <h4>Tumble Teller makes use of the <a href='https://carbonintensity.org.uk/'>CarbonIntensity</a> & <a href='https://openweathermap.org/'>OpenWeather</a> free APIs to help you determine how much carbon your local power grid is currently using, your local weather conditions, and - in turn - whether you should use your tumble dryer.</h4>
    </>
  )
}