// Images
import logoRect from '../assets/ttlogorect.png'

// Packages
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <>
    <h1>Welcome to Tumble Teller!</h1>
    <Link to="/"><img src={logoRect} alt="tt logo" /></Link>
    <h2></h2>
    <p></p>
    </>
  )
}