// React package imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Styling imports
import Modal from 'react-bootstrap/Modal'

// Images
import logoSq from "../assets/ttlogosq.png"


export default function Nav(){

  // State to open/close hamburger menu
  const [show, setShow] = useState(false)

  return (
    <>
    <header>
      {/* Icon linking back to homepage */}
      <Link to="/" className='logo0icon' src={logoSq} alt='tt logo' ></Link>
      {/* Hamburger nav menu */}
      <button className='nav-toggle' onClick={() => setShow(true)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <nav onClick={() => setShow(false)}>
          <Link to="/national"><i className='bold display-2'>Carbon Intensity by Region</i></Link>
          <Link to="/postcode"><i className='bold display-2'>Carbon Intensity for your location</i></Link>
          <Link to="/combo"><i className='bold display-2'>Should you use your Tumble Dryer today?</i></Link>
        </nav>
      </Modal.Header>
    </Modal>
    </>
  )
}