// ! Imports
// React package imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Styling imports
import Modal from 'react-bootstrap/Modal'

// Images
import logoSq from "../assets/ttlogosq.png"
import logoWWF from "../assets/wwf.jpeg"
import logoOx from "../assets/oxford.png"

// ! Default function
export default function Nav(){

  // State to open/close hamburger menu
  const [show, setShow] = useState(false)

  // ! JSX
  return (
    <>
    <header>
      {/* Icon linking back to homepage */}
      <div className='logos'>
        <Link to="/" ><img className='logo-icon' src={logoSq} alt='tt logo' /></Link>
        <a href="https://wwf.org.uk" target="_blank" ><img className='logo-icon' src={logoWWF} alt='wwf logo' /></a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" ><img className='logo-icon' src={logoOx} alt='wwf logo' /></a>
      </div>
      {/* Hamburger nav menu */}
      <button className='hamburger' onClick={() => setShow(true)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <nav onClick={() => setShow(false)}>
          <Link to="/national"><i className='bold display-4'>Carbon intensity by region</i></Link>
          <Link to="/postcode"><i className='bold display-4'>Carbon intensity for your location now</i></Link>
          <Link to="/forecast"><i className='bold display-4'>Nationwide carbon intensity forecast (48 hours)</i></Link>
          <Link to="/combo"><i className='bold display-4'>Should you use your tumble dryer today?</i></Link>
          <Link to="/comboforecast"><i className='bold display-4'>When should you use your tumble dryer?</i></Link>
        </nav>
      </Modal.Header>
    </Modal>
    </>
  )
}